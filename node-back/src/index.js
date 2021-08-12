const { response } = require("express")
const express = require("express")
var mysql = require('mysql')
const redis = require("redis");
var cors = require('cors')



var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysqldb',
    user: 'root',
    password: 'password',
    database: 'stajzt',
    

})

const client = redis.createClient({
    port: 6379,
    host: 'redis-server'
});



var app = express()
app.use(cors())


app.get("/", function (request, response) {
    console.log("Hey")
    response.send("Hi")
})


app.get("/sehirler", (request, response) => {


    client.exists("cities", (err, rep) => {

        if (rep == 1) {
            client.lrange("cities", 0, -1, (err2, res) => {
                console.log("redisten getirildi")

                response.send(res)
            })
        }

        else {
            pool.query('SELECT sehir_adi FROM sehirler', function (err, rows, fields) {
                if (err) throw err

                var list = []

                for (var i = 0; i < rows.length; i++) {
                    list.push(rows[i].sehir_adi);
                }

                client.rpush("cities", list, function (res, rep) {
                    console.log("redise kaydedildi")
                })

                response.send(list)

            })
        }
    })
})

app.get("/fissorgu", (request, response) => {

    let sehirler = request.query.sehirler
    let kurumlar = request.query.kurumlar
    let fiskodu = request.query.fisno

    pool.query("SELECT * FROM kisi INNER JOIN fis on kisi.idkisi = fis.sahibi WHERE sehir='" + sehirler + "' AND kurum='" + kurumlar + "' AND fiskodu='" + fiskodu + "'", function (err, rows, fields) {
        if (err) throw err

        response.send(rows[0])

    })

})


app.get("/odeme", (request, response) => {

    let yontem = request.query.tipi
    let ad = request.query.ad
    let kartno = request.query.kartno
    let cvv = request.query.cvv
    let ay = request.query.ay
    let yil = request.query.yil
    let tc = request.query.tc
    let tutar = request.query.tutar


    pool.query(`SELECT * FROM odeme_yontemi WHERE kart_no = '${kartno}' AND kart_isim = '${ad}' AND ay = ${ay} AND yil = ${yil} AND cvv= ${cvv}`, function (err, rows, fields) {
        if (err) throw err


        if (rows.length !== 0) {
            console.log(parseInt(rows[0].tipi))
            if (parseInt(rows[0].tipi) === 1 ) {
                if (parseFloat(rows[0].hesap) >= parseFloat(tutar)) {
                    console.log(rows[0].hesap)
                    pool.query(` UPDATE odeme_yontemi SET hesap = hesap - ${tutar}`, function (err, rows, fields) {
                        if (err) throw err
                    })
                    response.send({ Hata: 1, HesapNo: rows[0].hesap_no })
                }
                else {
                    response.send({ Hata: 2 })
                }
            }
            else if (parseInt(rows[0].tipi) === 2) {
                if (parseFloat(rows[0].limit) >= parseFloat(tutar)+parseFloat(rows[0].borc)) {
                    console.log(rows[0].limit + 'limit')
                    pool.query(` UPDATE odeme_yontemi SET borc = borc + ${tutar}`, function (err, rows, fields) {
                        if (err) throw err
                    })
                    response.send({ Hata: 1, HesapNo: rows[0].hesap_no })
                }
                else {
                    console.log(rows[0].limit >= tutar + rows[0].borc, tutar + rows[0].borc)
                    response.send({ Hata: 4 })
                }
            }


        }
        else {
            response.send({ Hata: 3 })
        }
    })

})


app.listen(10000, function () {
    console.log("Started application on port %d", 10000)
});
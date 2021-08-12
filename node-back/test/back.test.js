const assert = require('assert')
const request = require("request")
const should = require("should")






describe('Sehirler Testi', function () {

    it('Status Code, 200', function (done) {
        request.get("http://localhost:4530", function (err, resp, body) {
            resp.statusCode.should.equal(200)
            done()
        })
    })
    it('İlk elemani Adana olmali', function (done) {
        request.get("http://localhost:4530", function (err, resp, body) {


            let newb = JSON.parse(resp.body)
            let first = newb[0]
            first.should.equal("Adana")
            done()
        })
    })
    it('81 uzunlukta olmalı', function (done) {
        request.get("http://localhost:4530", function (err, resp, body) {
            let newb = JSON.parse(resp.body)
            let len = newb.length
            len.should.equal(81)
            done()
        })
    })

})


describe('Odeme Testi', function () {



    it('Status Code, 200', function (done) {
        request.get("http://localhost:4538", function (err, resp, body) {
            resp.statusCode.should.equal(200)
            done()
        })
    })
    it('Tutar Testi', function (done) {
        request.get("http://localhost:4522", function (err, resp, body) {

            let newb = JSON.parse(resp.body)
            let hesap = newb.hesap
            let tutar = 300

            assert.equal(hesap - tutar, 100)
            done()
        })
    })

    it('Tutar Testi CC', function (done) {
        request.get("http://localhost:4523", function (err, resp, body) {

            let newb = JSON.parse(resp.body)
            let limit = newb.limit
            let borc = newb.borc
            let tutar = 100

            assert.equal(limit - tutar - borc, 100)
            done()
        })
    })
    it('Key Kontrol', function (done) {
        request.get(`http://localhost:9901?kartno=1111222233334444&ad=asadasd&ay=12&yil=2021&cvv=333&tutar=10&tipi=1`, function (err, resp, body) {
            let newb = resp.body
            newb.should.equal('Done')
            done()
        })
    })
    it('Key Kontrol Hatalı Kart No', function (done) {
        request.get(`http://localhost:9901?kartno=11112222233334444&ad=asadasd&ay=12&yil=2021&cvv=333&tutar=10&tipi=1`, function (err, resp, body) {
            let newb = resp.body
            newb.should.not.equal('Done')
            done()
        })
    })

})




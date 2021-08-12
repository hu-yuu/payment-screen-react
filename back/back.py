from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="pw",
  database="stajzt"
)



@app.route("/sehirler")
def getCities():
    crs = mydb.cursor()
    crs.execute("SELECT sehir_adi FROM sehirler")
    res = crs.fetchall()
    res = jsonify(res)

    return res



@app.route("/fissorgu")
def getFisInfo():
  sehir = request.args.get('sehirler')
  kurum = request.args.get('kurumlar')
  fisno = request.args.get('fisno')
  crs = mydb.cursor()
  crs.execute("""SELECT ad, soyad, adres, fistarihi, fistutari, kurum, sehir FROM kisi INNER JOIN fis on kisi.idkisi = fis.sahibi
  WHERE sehir='{}' AND kurum='{}' AND fiskodu='{}'""".format(sehir, kurum, fisno))
  
  res = crs.fetchall()
  print(res)
  res = jsonify(res)

  return res


if __name__ == '__main__':
    app.run(debug=True)
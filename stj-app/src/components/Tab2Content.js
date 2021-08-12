import React, { useState } from 'react';

export const tab2util = { isInvalid: null }
const Tab2Content = (props) => {

    var [cvvState, setCVVState] = useState(0)
    var [kartNoState, setKartNoState] = useState(0)
    var [isimState, setIsimState] = useState("")
    var [ayState, setAyState] = useState(0)
    var [yilState, setYilState] = useState(0)
    var [yontemState, setYontemState] = useState(1)
    var [odemeDurumu, setOdemeDurumu] = useState(0)

    var data = props.data
    var tarih = props.tarih
    var hesapNo = props.hesapNo
    var setHesapNo = props.setHesapNo

    var aylar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    var yillar = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]


    const onOdeClick = () => {
        fetch(`http://localhost:10000/odeme?kartno=${kartNoState}&ad=${isimState}&ay=${ayState}&yil=${yilState}&cvv=${cvvState}&tutar=${data.fistutari}&yontem=${yontemState}`)
            .then(function (res) {
                return res.json();
            }).then((json) => {

                console.log(json)
                if (json.Hata === 2) {
                    console.log("222")
                    document.getElementById("modalMetni").innerHTML = "Yetersiz Bakiye"
                }
                else if (json.Hata === 3) {
                    console.log("333")

                    document.getElementById("modalMetni").innerHTML = "Hatalı Kart Bilgisi"

                }
                else if (json.Hata === 1) {
                    console.log("111")
                    setOdemeDurumu(odemeDurumu = 1)
                    document.getElementById("modalMetni").innerHTML = "Ödeme Başarılı"
                    console.log(json)
                    setHesapNo(hesapNo = json.HesapNo)
                    console.log(hesapNo)
                }
            })
    }



    tab2util.isInvalid = () => {
        if (cvvState < 100 || cvvState > 999) {
            document.getElementById("cvv").classList.add("invalid-border")
            document.getElementById("uyariCVV").classList.remove("d-none")

        }
        else if (cvvState >= 100 && cvvState <= 999) {
            document.getElementById("cvv").classList.remove("invalid-border")
            document.getElementById("uyariCVV").classList.add("d-none")

        }

        if (kartNoState.toString().length !== 16) {
            document.getElementById("kartno").classList.add("invalid-border")
            document.getElementById("uyariKartNo").classList.remove("d-none")

        }
        else {
            document.getElementById("kartno").classList.remove("invalid-border")
            document.getElementById("uyariKartNo").classList.add("d-none")

        }

        if (isimState.length === 0) {
            document.getElementById("isima").classList.add("invalid-border")
        }
        else {
            document.getElementById("isima").classList.remove("invalid-border")
        }

        if (ayState === 0) {
            document.getElementById("aya").classList.add("invalid-border")
        }
        else {
            document.getElementById("aya").classList.remove("invalid-border")
        }

        if (yilState === 0) {
            document.getElementById("yila").classList.add("invalid-border")
        }
        else {
            document.getElementById("yila").classList.remove("invalid-border")
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (

        <div className="container ml-5">
            <div  className="card mt-3 ">
                <div className="card-header text-primary">
                    Fiş Bilgileri
                </div>
                <div className="card-body ">
                    <div id="bilgiKart" className="row mt-3 ml-5 mb-2 ">
                        <div className="col-lg-6 col">
                            <label className="fw-bold text-primary">Ad: </label><label className="ml-3 one-margin">{data.ad}</label>
                        </div>
                        <div className="col-lg-6 col">
                            <label className="fw-bold text-primary">Soyad: </label><label className="ml-3 one-margin">{data.soyad}</label>
                        </div>
                    </div>

                    <div id="bilgiKart" className="row">
                        <div className="col">
                            <label className="fw-bold text-primary">Fiş Tarihi: </label><label className="ml-3 one-margin">{tarih}</label>
                        </div>
                        <div className="col mb-3">
                            <label className="fw-bold text-primary">Fiş Tutarı: </label><label className="ml-3 one-margin">{data.fistutari}</label>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="mb-4" />
            <form>
                <div className=" card d-block my-3">
                    <div className="card-header text-primary">Ödeme Yöntemi</div>
                    <div className="card-body">
                        <input className="form-check-input" onChange={(e) => {
                            setYontemState(yontemState = e.target.value)
                        }} type="radio" id="yontem1" name="odemeYontemi" value="1" checked/>
                        <label className="radio-label" >Yöntem 1</label><br />
                        <input className="form-check-input" onChange={(e) => {
                            setYontemState(yontemState = e.target.value)
                        }} type="radio" id="yontem2" name="odemeYontemi" value="2" />
                        <label className="radio-label" >Yöntem 2</label><br />
                    </div>

                </div>

                <hr className="mb-4" />

                <div className="d-block my-3 ">
                    <div className="card">
                        <div className="card-header text-primary">Kart Bilgileri</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="isimkart">Kartta Yazan İsim</label>
                                    <input type="text" onChange={(e) => {
                                        setIsimState(isimState = e.target.value)
                                    }} className="form-control" name="isimkart" id="isima" />
                                    <small className="text-muted">Kartta Yazan Ad ve Soyad Alanı</small>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="kartno">Kart Numarası</label>
                                    <input type="number" onChange={(e) => { setKartNoState(kartNoState = e.target.value) }} className="form-control" name="kartno" id="kartno" />
                                    <small id="uyariKartNo" className="d-none text-danger">Kart no 16 haneli olmalıdır</small>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8 col-lg-6">
                                    <label >Son Kullanma Tarihi</label>

                                </div>
                                <div className="col-3 col-lg-4">
                                    <label >CVV</label>
                                </div>

                            </div>
                            <div className="row mb-3">

                                <div className="col-3 col-lg-2 ">
                                    <select name="ayslct" onChange={(e) => { setAyState(ayState = e.target.value) }} className="form-control" name="aycc" id="aya" >
                                        <option selected disabled value value="0">Ay</option>
                                        {aylar.map((option, key) => <option key={key} >{option}</option>)}
                                    </select>


                                </div>
                                <div className="col-4 col-lg-3">
                                    <select onChange={(e) => { setYilState(yilState = e.target.value) }} className="form-control" name="yilcc" id="yila">
                                        <option selected disabled value value="0">Yıl</option>
                                        {yillar.map((option, key) => <option key={key} >{option}</option>)}

                                    </select>
                                </div>

                                <div className="col-4 col-lg-3 offset-1">
                                    <input className="form-control " onChange={(e) => { setCVVState(cvvState = e.target.value) }} name="cvv" id="cvv" type="number" required></input>
                                    <small id="uyariCVV" className="text-danger d-none">Hatalı!</small>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row d-flex justify-content-center mb-3">
                    <button className="btn btn-primary w-25" onClick={() => {
                        tab2util.isInvalid()
                        onOdeClick()
                    }} type="button" data-bs-toggle="modal" data-bs-target="#odeModal">Öde</button>
                </div>
            </form>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="odeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Uyarı</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="modalMetni" className="modal-body">

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                if (odemeDurumu === 1) {
                                    document.getElementById("pills-contact-tab").click()
                                }
                            }} data-bs-dismiss="modal">Kapat</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Tab2Content
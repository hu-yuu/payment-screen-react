import React, { useState, useRef } from 'react';

interface Tab2Props {
    data: any
    tarih: string
    hesapNo: number
    setHesapNo: any
}


const Tab2Content = ({ data, tarih, hesapNo, setHesapNo }: Tab2Props) => {

    var [cvvState, setCVVState] = useState(0)
    var [kartNoState, setKartNoState] = useState(0)
    var [isimState, setIsimState] = useState("")
    var [ayState, setAyState] = useState(0)
    var [yilState, setYilState] = useState(0)
    var [yontemState, setYontemState] = useState(1)
    var [odemeDurumu, setOdemeDurumu] = useState(0)


    var aylar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    var yillar = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]

    var refModal: any = useRef()
    var refCVV: any = useRef()
    var refCVVU: any = useRef()
    var refKNU: any = useRef()
    var refKartNo: any = useRef()
    var refIsim: any = useRef()
    var refAy: any = useRef()
    var refYil: any = useRef()


    const onOdeClick = () => {
        fetch(`http://localhost:10000/odeme?kartno=${kartNoState}&ad=${isimState}&ay=${ayState}&yil=${yilState}&cvv=${cvvState}&tutar=${data.fistutari}&yontem=${yontemState}`)
            .then(function (res) {
                return res.json();
            }).then((json) => {

                console.log(json)
                if (json.Hata === 2) {
                    console.log("222");
                    refModal.current.innerHTML = "Yetersiz Bakiye";
                }
                else if (json.Hata === 3) {
                    console.log("333");

                    refModal.current.innerHTML = "Hatalı Kart Bilgisi"

                }
                else if (json.Hata === 1) {
                    console.log("111")
                    setOdemeDurumu(odemeDurumu = 1);
                    refModal.current.innerHTML = "Ödeme Başarılı"
                    console.log(json)
                    setHesapNo(hesapNo = json.HesapNo)
                    console.log(hesapNo)
                }
            })
    }



    const isInvalid = () => {
        if (cvvState < 100 || cvvState > 999) {

            refCVVU.current.classList.remove("d-none");
            refCVV.current.classList.add("invalid-border")

        }
        else if (cvvState >= 100 && cvvState <= 999) {

            refCVVU.current.classList.add("d-none")
            refCVV.current.classList.remove("invalid-border")

        }

        if (kartNoState.toString().length !== 16) {

            refKartNo.current.classList.add("invalid-border")
            refKNU.current.classList.remove("d-none")

        }
        else {

            refKartNo.current.classList.remove("invalid-border")
            refKNU.current.classList.add("d-none")
        }

        if (isimState.length === 0) {

            refIsim.current.classList.add("invalid-border")
        }
        else {
            refIsim.current.classList.remove("invalid-border")
        }

        if (ayState === 0) {
            refAy.current.classList.add("invalid-border")
        }
        else {
            refAy.current.classList.remove("invalid-border")
        }

        if (yilState === 0) {
            refYil.current.classList.add("invalid-border")
        }
        else {
            refYil.current.classList.remove("invalid-border")

        }

    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    return (

        <div className="container ml-5">
            <div className="card mt-3 ">
                <div className="card-header text-primary">
                    Fiş Bilgileri
                </div>
                <div className="card-body ">
                    <div id="bilgiKart" className="row mt-3 ml-5 mb-2 ">
                        <div className="col-lg-6 col">
                            <label className="fw-bold text-primary">Ad: </label><label className="ml-3 one-margin">{data?.ad}</label>
                        </div>
                        <div className="col-lg-6 col">
                            <label className="fw-bold text-primary">Soyad: </label><label className="ml-3 one-margin">{data?.soyad}</label>
                        </div>
                    </div>

                    <div id="bilgiKart" className="row">
                        <div className="col">
                            <label className="fw-bold text-primary">Fiş Tarihi: </label><label className="ml-3 one-margin">{tarih}</label>
                        </div>
                        <div className="col mb-3">
                            <label className="fw-bold text-primary">Fiş Tutarı: </label><label className="ml-3 one-margin">{data?.fistutari}</label>
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
                            setYontemState(yontemState = parseInt(e.target.value))
                        }} type="radio" id="yontem1" name="odemeYontemi" value="1" checked />
                        <label className="radio-label" >Yöntem 1</label><br />
                        <input className="form-check-input" onChange={(e) => {
                            setYontemState(yontemState = parseInt(e.target.value))
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
                                    }} className="form-control" name="isimkart" id="isima" ref={refIsim} />
                                    <small className="text-muted">Kartta Yazan Ad ve Soyad Alanı</small>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="kartno">Kart Numarası</label>
                                    <input type="number" onChange={(e) => { setKartNoState(kartNoState = parseInt(e.target.value)) }} className="form-control" ref={refKartNo} name="kartno" id="kartno" />
                                    <small ref={refKNU} id="uyariKartNo" className="d-none text-danger">Kart no 16 haneli olmalıdır</small>
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
                                    <select onChange={(e) => { setAyState(ayState = parseInt(e.target.value)) }} ref={refAy} className="form-control" name="aycc" id="aya" >
                                        <option selected disabled value="0">Ay</option>
                                        {aylar.map((option, key) => <option key={key} >{option}</option>)}
                                    </select>

                                </div>
                                <div className="col-4 col-lg-3">
                                    <select onChange={(e) => { setYilState(yilState = parseInt(e.target.value)) }} ref={refYil} className="form-control" name="yilcc" id="yila">
                                        <option selected disabled value="0">Yıl</option>
                                        {yillar.map((option, key) => <option key={key} >{option}</option>)}

                                    </select>
                                </div>

                                <div className="col-4 col-lg-3 offset-1">
                                    <input className="form-control " onChange={(e) => { setCVVState(cvvState = parseInt(e.target.value)) }} ref={refCVV} name="cvv" id="cvv" type="number" required></input>
                                    <small id="uyariCVV" ref={refCVVU} className="text-danger d-none">Hatalı!</small>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row d-flex justify-content-center mb-3">
                    <button className="btn btn-primary w-25" onClick={() => {
                        isInvalid()
                        onOdeClick()
                    }} type="button" data-bs-toggle="modal" data-bs-target="#odeModal">Öde</button>
                </div>
            </form>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="odeModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Uyarı</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div ref={refModal} id="modalMetni" className="modal-body">

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                if (odemeDurumu === 1) {
                                    (document.getElementById("pills-contact-tab") as HTMLInputElement).click()
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
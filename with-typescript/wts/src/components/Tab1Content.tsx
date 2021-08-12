import React, { useState, useEffect, useRef } from 'react';



interface Tab1Props {
    setData: any
    data: any
    values: Array<string>
    setTarih: any
    tarih: string
}



const Tab1Content = ({ setData, data, values, setTarih, tarih }: Tab1Props) => {

    var [sehir, setSehir] = useState<string>("")
    var [kurum, setKurum] = useState<string>("")
    var [kurum2, setKurum2] = useState<string>("")
    var [kod, setKod] = useState<string>("")

    var refGB:any = useRef()



    useEffect(() => {
        if (sehir !== "def" && kurum !== "defK" && kod.length === 10) {
            
            refGB.current.disabled = false;
        }
        else {
            refGB.current.disabled = true
        }

    }, [sehir, kurum, kod])


    const handleSehirChange = (event: any) => {
        setSehir(sehir = event.target.value)
    }

    const handleKurumChange = (event: any) => {
        setKurum(kurum = event.target.value)
    }

    const handleDataSubmit = (e: any) => {
        e.preventDefault()
        setData(data = {})
        fetch("http://localhost:10000/fissorgu?sehirler=" + sehir + "&kurumlar=" + kurum + "&fisno=" + kod)
            .then(function (res) {
                return res.json();
            }).then((json) => {

                setData(data = json)
                console.log(data)
                setTarih(tarih = data.fistarihi.substring(0, 10))
            });

                    
        (document.getElementById("pills-profile-tab") as HTMLInputElement).disabled = false;    
        (document.getElementById("pills-profile-tab") as HTMLInputElement).click();
    }


    const combthr = () => {

        if (sehir === "İstanbul" && kurum === "Dogalgaz") {
            return (

                <div  >
                    <label className="form-label " htmlFor="combt">Kurum Seçiniz</label>
                    <select className="form-control textFocused" name="combt" >
                        <option value="igdas">İgdas</option>
                    </select>
                </div>
            );
        } else if (sehir === "Ankara" && kurum === "Su") {
            return (
                <div >
                    <label className="form-label" htmlFor="combt">Kurum Seçiniz</label>
                    <select className="form-control" name="combt" >
                        <option value="aski">Aski</option>
                    </select>
                </div>

            );

        }
        else {
            return (<div ></div>);
        }
    }


    return (


        <div className="container ml-5 mb-3 ">

            <form>
                <div className="row mt-3 ml-3 first-tab-margin">
                    <div className="col-lg-8 col-xs-6 ">
                        <label htmlFor="şehirler" className="form-label pl-3">Şehirler</label>
                        <select className="form-control" id="sehirler" name="sehirler" onChange={handleSehirChange}>
                            <option selected disabled value="def">Şehir Seçiniz</option>
                            {values.map((option, key) => <option key={key} value={option}>{option}</option>)}
                        </select>
                    </div>
                </div>
                <div className="row mt-3 ml-3 first-tab-margin">
                    <div className="col-lg-8 col-xs-6">
                        <label htmlFor="kurumlar" className="form-label">Kurumlar</label>
                        <select className="form-control" id="kurumlar" name="kurumlar" onChange={
                            handleKurumChange
                        }>
                            <option selected disabled value="def">Kurum Seçiniz</option>
                            <option value="Dogalgaz">DoğalGaz</option>
                            <option value="Su">Su</option>
                            <option value="Elektrik">Elektrik</option>
                        </select>
                    </div>

                </div>

                <div className="row mt-3 ml-3 first-tab-margin">
                    <div className="col-lg-8 col-xs-6 ">
                        {combthr()}
                    </div>

                </div>
                <div className="row mt-3 ml-3 first-tab-margin">
                    <div className="col-lg-6 col-xs-6">
                        <label htmlFor="fiskodu" className="form-label ">Fiş Kodunu Giriniz</label>

                    </div>
                </div>

                <div className="row  ml-3 first-tab-margin">
                    <div className="col-lg-6 col-xs-6">
                        <input id="fiskod" data-bs-toogle="tooltip" title="Fiş Numarası 10 haneli olmalıdır" data-bs-placement="top" type="text" name="fiskodu" placeholder="A123B2U8DK" onChange={
                            (e) => {
                                setKod(e.target.value)
                            }
                        } ></input>

                    </div>
                    <small className="text-muted">10 Haneli Fiş Kodu</small>

                </div>

                <div className="row d-flex justify-content-center">
                    <button ref={refGB} id="gonderButton" className="btn btn-primary mt-4 w-25" onClick={handleDataSubmit}  >Gönder</button>

                </div>


            </form>

        </div>

    )
}

export default Tab1Content
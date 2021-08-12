import React, { useState, useEffect } from 'react'
import Tab2Content from './Tab2Content'
import Tab1Content from './Tab1Content'
import Tab3Content from './Tab3Content'

const SehirKurumfc = () => {


    var [values, setValues] = useState([])
    var [data, setData] = useState({})
    var [tarih, setTarih] = useState("")
    var [hesapNo, setHesapNo] = useState(0)


    useEffect(() => {
        fetch('http://localhost:10000/sehirler')
            .then(function (res) {
                return res.json();
            }).then((json) => {

                setValues(values = json)
            })
    }, [])

    return (


        <div className="container custom-container mt-5">

            <ul className="nav nav-pills  nav-fill border border-2 rounded pills-color" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Aşama 1</button>
                </li>
                <li id="scndTab" className="nav-item" role="presentation">
                    <button disabled className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Aşama 2</button>
                </li>
                <li id="thrdTab" className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Aşama 3</button>
                </li>
            </ul>
            <div className="tab-content border border-2 rounded mb-5" id="tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">


                    <Tab1Content setData={setData} data={data} values={values} setTarih={setTarih} tarih={tarih} />


                </div>
                <div className="tab-pane fade " id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                    <Tab2Content data={data} tarih={tarih} hesapNo={hesapNo} setHesapNo={setHesapNo} />

                </div>
                <div className="tab-pane fade " id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <Tab3Content data={data} hesapNo={hesapNo} />
                </div>
            </div>

        </div>


    )


}

export default SehirKurumfc
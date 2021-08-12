import React from 'react'

interface Tab3Props {
    data: any
    hesapNo: number
}


const Tab3Content = ({ data,  hesapNo }: Tab3Props) => {




    var objL = {
        "hesapNo": hesapNo,
        "kurum": data?.kurum,
        "tckn": data?.idkisi,
        "fatura": data?.fistutari,
        "tahsilatTutari": data?.fistutari,
        "durum": "Ödendi",
        "adi": data?.kurum,
        "fisNo": data?.fiskodu

    }


    return (
        <div>
            <h3 className="text-center mt-3" style={{ color: "green" }}>Tahsilat İşlemleri Özeti</h3>
            <p className="text-center fw-bold"> {objL.hesapNo} numaralı hesaptan gerçekleştirilen işlemin özeti</p>
            <div className="border border-4 rounded">
                <div className="row mx-5 mt-5 m-xs">
                    <div className="col">
                        Kurum
                    </div>

                    <div className="col">
                        <p className="fw-bold ">{objL.kurum}</p>
                    </div>
                </div>
                <div className="row mx-5 m-xs">
                    <div className="col">
                        TCKN/VN
                    </div>

                    <div className="col">
                        <p className="fw-bold ">{objL.tckn}</p>
                    </div>

                    <hr className="ml-5 border border-1 border-secondary" />
                </div>

                <div className="row mx-5 mt-5 m-xs">
                    <div className="col">
                        Toplam Tahsilat Tutarı
                    </div>

                    <div className="col">
                        <p className="fw-bold">{objL.tahsilatTutari} TRY</p>
                    </div>

                </div>

                <div className="row m-table" style={{ overflowX: "auto" }}>
                    <div className="d-flex justify-content-center mt-5 mb-3" >
                        <table className="border border-2">
                            <tr>
                                <td id="empty" /><td id="empty" /><td id="empty" /><td id="empty" /><td id="empty" />
                                <td id="empty">  .. </td>
                            </tr>
                            <tr>
                                <td className="border border-2">Durum</td>
                                <td className="border border-2">Adı</td>
                                <td className="border border-2">Fatura</td>
                                <td className="border border-2">Tahsilat</td>
                                <td className="border border-2">Fiş No</td>
                                <td className="border border-2">iptal</td>
                            </tr>
                            <tr>
                                <td className="border border-2">{objL.durum}</td>
                                <td className="border border-2">{objL.adi} </td>
                                <td className="border border-2">{objL.fatura} TRY</td>
                                <td className="border border-2">{objL.tahsilatTutari} TRY</td>
                                <td className="border border-2">{objL.fisNo}</td>
                                <td className="border border-2">
                                    <a id="iptalbttn" data-bs-toggle="modal" data-bs-target="#modalIptal" href="#">İptal Et</a>
                                </td>
                            </tr>

                        </table>

                    </div>
                </div>


            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalIptal" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">İptal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Ödemeyi İptal Etmek İstiyor musunuz?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hayır</button>
                            <input type="submit" className="btn btn-primary" value="Evet"></input> 
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Tab3Content
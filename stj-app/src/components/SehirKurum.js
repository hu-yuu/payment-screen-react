import React, {useState} from 'react';


class SehirKurum extends React.Component {
    state = {
        values: [],
        sehir: "",
        kurum: ""
    }

    

    componentDidMount() {
        fetch('http://localhost:5000/sehirler')
         .then(function(res) {
             return res.json();
         }).then((json)=> {
             
             this.setState({
                values: json
             })
             console.log(this.state.values)
         });
     }
 
    handleSehirChange = (event) => {
        this.setState({ sehir: event.target.value })
    }

    handleKurumChange = (event) => {
        this.setState({ kurum: event.target.value })
    }

    combthr(){
        if(this.state.sehir === "İstanbul" && this.state.kurum === "dogalgaz") {     
            return (
                <div>
                   <form>
                        <label for="combt" >Seçiniz</label>
                        <select name="combt" >
                            <option value="igdas">İgdas</option>
                        </select>
                        <br/>
                    </form>
                    <br/><br/>
                </div>
            );
        } else if (this.state.sehir === "Ankara" && this.state.kurum === "su"){ 
            return (
                <div>
                <form>
                     <label for="combt" >Seçiniz</label>
                     <select name="combt" >
                         <option value="aski">Aski</option>
                     </select>
                     <br/>
                 </form>
                 <br/><br/><br/>
             </div>
             
             );
            
        } 
        else {
            return (<div></div>);
        }
    }

    render(){
        

        return <div>
        <div className='div-mt'>
            <form>
                <label for="sehirler" >Şehirler</label>
                <select name="sehirler" 
                onChange={this.handleSehirChange}
                >
                    {   this.state.values.map((option, key) => <option key={key} >{option}</option>) }
                </select>
                <br/>
                  
        <br/><br/>
                <label for="kurumlar" >Kurumlar</label>
                <select name="kurumlar" onChange={
                    this.handleKurumChange
                    }>
                    <option value="dogalgaz">DoğalGaz</option>
                    <option value="su">Su</option>
                    <option value="elektrik">Elektrik</option>
                </select>
                <br/>
            </form>
        </div>
        <br/><br/>
        <div>
           
            {this.combthr()}
            
            <input type="submit" value="Submit"/>
        </div>

    </div>
    }
}


export default SehirKurum;
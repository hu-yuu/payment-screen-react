import '../static/res.css'
import React, { useState } from 'react';
import Header from './Header';
import SehirKurumfc from './SehirKurumfc';
import SideBar from './SideBar';


function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
}

function App() {


  var [sideState, setSide] = useState(false)


  function moveNav() {
    if (sideState === true) {

      document.getElementById("mySidenav").style.width = "0";
      setSide(sideState = false)
    }
    else {
      document.getElementById("mySidenav").style.width = "180px";
      setSide(sideState = true)

    }
  }


  return (
    <div id="bcContainer" >
      <Header moveNav={moveNav} />
      <SideBar />
      <SehirKurumfc />

    </div>
  );
}


export default App;

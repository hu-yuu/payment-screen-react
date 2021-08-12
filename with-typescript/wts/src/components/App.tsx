import React, {useState} from 'react'
import '../static/res.css'
import SehirKurumfc from './sehirkurumfc'


function App() {

  var [sideState, setSide] = useState<boolean>(false)

  return (
    <div id="bcContainer" >
      <SehirKurumfc />
    </div>
  );
}

export default App

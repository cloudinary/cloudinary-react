import React from 'react';
import {Image} from 'cloudinary-react';
import './App.css';

function App() {
  return (
    <div>
      <h1>Responsive Image</h1>
      <div style={{width: "330px"}}>
        <Image id="responsive" publicId="sample" cloudName="demo" width="auto" crop="scale" responsive/>
      </div>
      <div style={{width: "330px"}}>
        <Image id="disable-breakpoints" publicId="sample" cloudName="demo" width="auto" crop="scale" responsive responsiveUseBreakpoints={false}/>
      </div>
      <div style={{width: "330px"}}>
        <Image id="breakpoints" publicId="sample" cloudName="demo" width="auto" crop="scale" responsive responsiveUseBreakpoints={true} breakpoints={()=>450}/>
      </div>
    </div>
  );
}

export default App;

import React, {Fragment, useState} from 'react';
import {Image, Placeholder} from 'cloudinary-react';
import './App.css';

const tests = [
  'responsive',
  'placeholder',
  'lazy',
  'lazyPlaceholder',
  'lazyResponsive',
  'responsivePlaceholder'
];

function App() {
  const [test, setTest] = useState(0);

  const Buttons = () => (
    <Fragment>
      {
        tests.map((t, i) =>
          <button key={"btn-"+i} id={t + 'Btn'} onClick={() => setTest(t)}>{t + ' test'}</button>
        )
      }
    </Fragment>
  );

  return (
    <Fragment>
      <Buttons />
      {test === 'responsive' &&
      <Fragment>
        <h1>Responsive Image</h1>
        <div style={{width: "330px"}}>
          <Image id="responsive-override" publicId="sample" cloudName="demo" width={100} crop="scale" responsive/>
        </div>
        <div style={{width: "330px"}}>
          <Image id="responsive" publicId="sample" cloudName="demo" width="auto" crop="scale" responsive/>
        </div>
        <div style={{width: "330px"}}>
          <Image id="disable-breakpoints" publicId="sample" cloudName="demo" width="auto" crop="scale" responsive
                 responsiveUseBreakpoints={false}/>
        </div>
        <div style={{width: "330px"}}>
          <Image id="breakpoints" publicId="sample" cloudName="demo" width="auto" crop="scale" responsive
                 responsiveUseBreakpoints={true} breakpoints={() => 450}/>
        </div>
      </Fragment>
      }
      {test === 'placeholder' &&
      <div>
        <h1>Placeholder</h1>
        <Image id="placeholder" publicId="sample" cloudName="demo" width="300" crop="scale">
          <Placeholder/>
        </Image>
      </div>
      }
      {test === 'lazy' &&
      <div>
        <h1>Lazy</h1>
        <div style={{marginTop: '3000px'}}>
          <Image id="lazy" publicId="sample" cloudName="demo" width="300" crop="scale" loading="lazy"/>
        </div>
      </div>
      }
      {test === 'lazyPlaceholder' &&
      <div>
        <h1>Lazy Placeholder</h1>
        <div style={{marginTop: '3000px'}}>
          <Image id="lazyPlaceholder" publicId="sample" cloudName="demo" width="300" crop="scale" loading="lazy">
            <Placeholder/>
          </Image>
        </div>
      </div>
      }
      {test === 'lazyResponsive' &&
      <div>
        <h1>Lazy Responsive</h1>
        <div style={{marginTop: '3000px'}}>
          <div style={{width: "330px"}}>
            <Image id="lazyResponsive" publicId="sample" cloudName="demo" width="auto" crop="scale" loading="lazy"
                   responsive>
            </Image>
          </div>
        </div>
      </div>
      }
      {test === 'responsivePlaceholder' &&
      <div>
        <h1>Responsive Placeholder</h1>
        <div style={{width: "330px"}}>
          <Image id="responsivePlaceholder" publicId="sample" cloudName="demo" width="auto" crop="scale" responsive>
            <Placeholder/>
          </Image>
        </div>
      </div>
      }
    </Fragment>
  );
}

export default App;

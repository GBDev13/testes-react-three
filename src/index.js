import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-colorful/dist/index.css"
import Ak47 from './Ak47';
import Tenis from './Tenis';

ReactDOM.render(
  <React.StrictMode>
    <Ak47 />
    {/* <Tenis /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

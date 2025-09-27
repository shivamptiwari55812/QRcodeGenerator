import React, { useState } from 'react';
import QRGenerator from './component/Generator.tsx';
import BarcodeScanner from './component/Scanner.tsx';


const App = () => {
  const [mode, setMode] = useState('menu'); // menu | generator | scanner

  const handleBack = () => {
    setMode('menu');
  };

  return (
    <QRGenerator/>
  );
};

export default App;

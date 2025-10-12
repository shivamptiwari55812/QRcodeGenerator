import React, { useState , useNavigation} from 'react';
import QRGenerator from './component/Generator.tsx';
import BarcodeScanner from './component/Scanner.tsx';
import ProductList from './component/GeneratorWarehouse.jsx';
const App = () => {

  // const navigate =useNavigate();
  const [mode, setMode] = useState('menu'); // menu | generator | scanner

  const handleBack = () => {
    setMode('menu');
  };

  return (
    <BarcodeScanner/>
  );
};

export default App;

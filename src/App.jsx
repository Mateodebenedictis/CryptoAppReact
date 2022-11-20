import './App.css';
import Crypto from './components/Crypto';
import { Route, Routes, Navigate } from 'react-router-dom';
import CryptoDetail from './components/CryptoDetail';
import {logoMateoDev} from './assets'

const styles = {
  logo: {
    width: '100px',
    height: '25px',
    display: 'block',
    marginRight: '10px'
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    margin: '10px 5px'
  }
};

function App() {


  return (
    <div className="container-fluid ">
      <div style={styles.row}>
        <img src={logoMateoDev}  style={styles.logo}/>
        <h4 className="text-center mb-3 mt-3">Mathew Crypto App</h4>
      </div>

      <Routes>
        <Route path="/" element={<Crypto/>} />
        <Route path="/crypto/:id" element={<CryptoDetail/>} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      
    </div>
  );
}

export default App;

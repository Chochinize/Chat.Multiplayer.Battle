import Field from './components/Field';
import UIbox from './components/UIbox';
import Menu from './components/Menu/Menu';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Layout from './components/Layout';
import Room from './components/Room/Room';
import axios from "axios";
import MainRoom from './components/Room/MainRoom';


function App() {
  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASEURL : process.env.REACT_APP_PROD_BASEURL;
  axios.defaults.withCredentials = true;
  return (
    <div className="border-2 border-black w-[99vw]  h-[80vh] m-auto relative top-[10vh] ">

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="mainroom" element={<MainRoom />} />
        </Route>
      </Routes>
    </div>

  );
}

export default App;

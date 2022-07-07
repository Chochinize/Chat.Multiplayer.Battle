

import Menu from './components/Menu/Menu';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Layout from './Layout';

import axios from "axios";
import MainRoom from './components/Room/MainRoom';  


function App() {
  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASEURL : process.env.REACT_APP_PROD_BASEURL;
  axios.defaults.withCredentials = true;
  
  return (
    <div className="border-l-[20px] border-black w-full  h-screen  relative  ">

      <Routes>
        <Route path='/' element={<Layout />}>
          {/* <Route path={`/mainroom`} element={<MainRoom />} /> */}
          <Route path="/mainroom/:id" element={<MainRoom />} />
          
        </Route>
      </Routes>
    </div>

  );
}

export default App;

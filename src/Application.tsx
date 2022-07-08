

import Menu from './components/FirstThinkYouDoWhenYouJoinWebSite';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Layout from './components';

import axios from "axios";
import Main from './components/NavigationRoutes/Main';  



function App() {
  axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASEURL : process.env.REACT_APP_PROD_BASEURL;
  axios.defaults.withCredentials = true;
  
  return (
    <div className="border-l-[20px]  w-full  h-screen   border-2 border-yellow-400  ">
      
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route path="/mainroom/:id" element={<Main/>} />
          {/* <Route path="/mainroom/:id/createRoom" element={<Second/>} /> */}
          {/* <Route path="/mainroom/" element={< />} /> */}


         
          
        </Route>
      </Routes>
    </div>

  );
}

export default App;

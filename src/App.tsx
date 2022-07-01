import Field from './components/Field';
import UIbox from './components/UIbox';
import Menu from './components/Menu/Menu';
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Layout from './components/Layout';

function App() {
  return (
    <div className="border-2 border-black w-[70vw]  h-[50vh] m-auto relative top-[20vh]">
    
    <Routes>
    <Route path='/' element={<Layout/>}>
      {/* Public routes */}

      <Route path='secret' element={<Field/>}/> 


      {/* Protected routes */}
      {/* <Route element={<RequireAuth/>}> */}
        {/* <Route path='/' element={<Home/>}/> */}
        {/* <Route path='editor' element={<Editor/>}/> */}
        
        
        
      {/* </Route> */}
      {/* Catch all  */}
      <Route path='*' element={''}/>
    </Route>
  </Routes>
      </div>

  );
}

export default App;

import Field from './components/Field';
import UIbox from './components/UIbox';
import Menu from './components/Menu/Menu';
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Layout from './components/Layout';
import Room from './components/Room/Room';

function App() {
  return (
    <div className="border-2 border-black w-[70vw]  h-[50vh] m-auto relative top-[20vh]">
    
    <Routes>
          <Route path='/' element={<Layout />}>
          <Route
          path="room"
          element={<Room/>}
        />
          </Route>
        </Routes>
      </div>

  );
}

export default App;

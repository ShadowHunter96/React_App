
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser.js';
import EditUser from './users/EditUser.js';
import ViewUser from './users/ViewUser.js';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/adduser" element={<AddUser/>}></Route>
        <Route exact path="/edituser/:id" element={<EditUser/>}></Route>
        <Route exact path="/viewuser/:id" element={<ViewUser/>}></Route>
      </Routes>


      

      </Router>
      
    </div>
  );
}

export default App;

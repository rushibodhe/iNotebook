import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';




// Added following code from 1.newTextutils App.js for alert:
function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (alertType, message) => {
    setAlert({
      alert: alertType,
      msg: message
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }



  return (
    <>
      <NoteState>
        <Router >
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router >
      </NoteState>
    </>
  );
}


export default App;

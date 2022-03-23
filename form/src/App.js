import React, { useEffect, useState } from "react";
import './App.css';
import Form from './components/Form';
import image from './image/image.jpg'
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Profile from "./components/Profile";
import Preloader from "./utils/preloader/preloader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/login')
      .then(response => response.json())
      .then(json => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      {loading ? <Preloader /> :
        <div>
          <img src={image}/>
          <Routes>
            <Route path='/login' element={<Form />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/' element={<Form />}/>
          </Routes>
        </div>
      }
    </BrowserRouter>
  );
}

export default App;

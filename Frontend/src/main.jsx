import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // Fixing the import
import './index.css';
import Layout from '../Layout.jsx';
import App from './App.jsx';
import Home from './components/Home.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signup from './components/Signup';  // Import Signup
import LoginIn from './components/LoginIn';  // Import LoginIn
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='Signup' element={<Signup/>}/>
      <Route path='LoginIn' element={<LoginIn/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);

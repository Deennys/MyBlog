import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import styles from "./App.css";

//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";


export default function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </div>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

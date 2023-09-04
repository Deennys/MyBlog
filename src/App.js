import styles from "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useState, useEffect } from "react";
import { UseAuthentication } from "./hooks/UseAuthentication";

//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";

//context
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [user, setUser] = useState(undefined);
  const {auth} = UseAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loadingUser) {
    return <p>Loading...</p>
  }


  return (
    <div className={styles.container}>
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login"/>} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login"/>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}


import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import Home from './Pages/Home'
import QrCode from './Pages/QrCode'
import Contact from './Pages/Contact'
import Navbar from './Components/Navbar'
import Crud from './Pages/Crud'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/QrCode' element={<QrCode />} />
          <Route path='/Crud' element={<Crud />} />
          <Route path='/COntact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

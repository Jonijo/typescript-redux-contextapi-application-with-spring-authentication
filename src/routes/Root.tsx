import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const Root = () => {
  
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Root
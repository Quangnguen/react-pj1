
import './App.scss';
import Header from './components/Header';

import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';

import AppRouters from './routes/AppRoutes'
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from 'react';

function App() {

  const { user,loginContext } = useContext(UserContext);
  useEffect(() => {
    if(localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  }, [])
  return (
    <>
    <div className='app-container'>
      <Header />
      <Container>
        <AppRouters />
       
      </Container>

      
    </div>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    // transition: Bounce,
    />
    </>
  );
}

export default App;

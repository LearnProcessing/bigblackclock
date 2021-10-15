import React from 'react';
import MainPage from './pages/MainPage';
import AppCSS from './AppCSS.module.css';


function App() {
  return (
    <>
      <div className={AppCSS.appContainer}>
        <MainPage />
      </div>
      <div className={AppCSS.mobileContainer}> 
        <h2 className={AppCSS.mobileText}>Sorry, this app is not available on mobile . . .</h2>
      </div>
    </>
  );
}

export default App;

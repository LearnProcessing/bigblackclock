import React from 'react';
import MainPage
 from './pages/MainPage';
import AppCSS from './AppCSS.module.css'

function App() {
  return (
    <div className={AppCSS.appContainer}>
      <MainPage/>
    </div>
  );
}

export default App;

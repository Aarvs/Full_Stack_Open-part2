import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Course from './components/course';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App Course={Course}/>
  </React.StrictMode>
);



import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { WorkoutsContextProvider } from './context/WorkoutsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <WorkoutsContextProvider>
      <App />
  </WorkoutsContextProvider>
)

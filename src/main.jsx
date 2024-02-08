import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ActiveConversationProvider } from './message/MessageContext/ActiveConversationProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ActiveConversationProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ActiveConversationProvider>
  </React.StrictMode>
)

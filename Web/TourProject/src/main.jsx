import { createRoot } from 'react-dom/client'
import { BrowserRouter  } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import './styles/custom.css';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

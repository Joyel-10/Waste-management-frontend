import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api'; 
import "primereact/resources/primereact.min.css";                
import "primeicons/primeicons.css";     
import "primereact/resources/themes/lara-light-green/theme.css"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { NextThemeProvider } from './components/NextUItheme.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextThemeProvider>
    <App />
    </NextThemeProvider>
  </StrictMode>,
)

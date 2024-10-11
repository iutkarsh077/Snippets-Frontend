import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { NextThemeProvider } from './components/NextUItheme.tsx';
import { GlobalContextProvider } from './components/GlobalUserProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <GlobalContextProvider>
    <NextThemeProvider>
    <App />
    </NextThemeProvider>
    </GlobalContextProvider>
)

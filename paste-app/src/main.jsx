import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import toast, { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
import store from './store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#16161f',
          color: '#F1F0FF',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          padding: '12px 16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        },
        success: {
          iconTheme: { primary: '#10B981', secondary: '#16161f' },
        },
        error: {
          iconTheme: { primary: '#EF4444', secondary: '#16161f' },
        },
      }}
    />
  </Provider>
)

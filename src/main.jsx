import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { AlertProvider } from './AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'

const root = document.getElementById('root')
if (root != null)
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

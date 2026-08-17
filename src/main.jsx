import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../style.css' // We will keep style.css in the root or move it. Assuming we keep it in root for now, or we can move it to src/style.css. Let's move it to src later or just import it from root.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

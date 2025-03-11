import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header'
import Footer from './Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <App />
      </main>
      <Footer />
    </div>
  </StrictMode>
)

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import arrow from './assets/arrow-right.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <div className='cards'>
        <div className='card'>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6"> <img style={{height:"192px", width: "440px", objectFit:"contain"}} src="src\assets\DB.png" alt="Logo" /> </div>
          <div className="card-body">
            <p className='text-xl font-semibold '>Daten und Schemata</p>
            <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          <button
          type="button"
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Daten hochladen
        </button>
          </div>
        </div>
      </div>

      <div className='card'>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6"> <img style={{height:"192px", width: "440px", objectFit:"contain"}} src="src\assets\Metabase.png" alt="Logo" /> </div>
          <div className="card-body">
            <p className=' text-xl font-semibold '>Metabase</p>
            <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          <button
          type="button"
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <div style={{display:"flex"}} className='gap-3'>
            Metabase
            <img src={arrow} alt="" />
          </div>
        </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App

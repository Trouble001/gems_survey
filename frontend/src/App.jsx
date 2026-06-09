import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import VillageWiseView from './pages/VillageWiseView'
import VillageManager from './pages/VillageManager'
import PrintView from './pages/PrintView'

function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/20 text-white'
        : 'text-blue-100 hover:bg-white/10 hover:text-white'
    }`

  return (
    <nav className="bg-primary-800 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-base">
            🏫 Genius English Medium School
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
            <NavLink to="/add" className={linkClass}>+ Add Student</NavLink>
            <NavLink to="/villages" className={linkClass}>Villages</NavLink>
            <NavLink to="/print" className={linkClass}>🖨️ Print</NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
            onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-1" onClick={() => setOpen(false)}>
            <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
            <NavLink to="/add" className={linkClass}>+ Add Student</NavLink>
            <NavLink to="/villages" className={linkClass}>Villages</NavLink>
            <NavLink to="/print" className={linkClass}>🖨️ Print</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/edit/:id" element={<EditStudent />} />
            <Route path="/village/:villageId" element={<VillageWiseView />} />
            <Route path="/villages" element={<VillageManager />} />
            <Route path="/print" element={<PrintView />} />
          </Routes>
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: '#dcfce7', color: '#15803d', fontWeight: 600 } },
          error: { style: { background: '#fee2e2', color: '#dc2626', fontWeight: 600 } },
        }}
      />
    </BrowserRouter>
  )
}

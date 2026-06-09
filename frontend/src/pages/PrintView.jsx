import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../store/slices/studentSlice'

export default function PrintView() {
  const dispatch = useDispatch()
  const { list: students, loading } = useSelector(s => s.students)

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-black">HiTech Computer Institute — Dhurkot Janjgir</h1>
        <p className="text-sm text-slate-500 mt-1">
          Student Admission Survey · Printed: {new Date().toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric'
          })}
        </p>
        <hr className="my-2 border-slate-300" />
      </div>

      {/* Print & Back buttons */}
      <div className="no-print flex gap-3 justify-center mb-4">
        <button
          onClick={() => window.print()}
          className="btn btn-primary"
        >
          🖨️ Print / Save as PDF
        </button>
        <a href="/" className="btn btn-ghost">← Back</a>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-primary-800 text-white">
            {['#', 'Name', "Father's Name", 'Phone', 'Class', 'Village', 'Date'].map(h => (
              <th key={h} className="px-3 py-2 text-left font-semibold text-xs uppercase tracking-wide border border-blue-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s, idx) => (
            <tr key={s.id} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
              <td className="px-3 py-1.5 border border-slate-200 text-slate-400">{idx + 1}</td>
              <td className="px-3 py-1.5 border border-slate-200 font-semibold">{s.name}</td>
              <td className="px-3 py-1.5 border border-slate-200">{s.father_name}</td>
              <td className="px-3 py-1.5 border border-slate-200">{s.phone_number}</td>
              <td className="px-3 py-1.5 border border-slate-200">{s.class_enrolled_display || s.class_enrolled}</td>
              <td className="px-3 py-1.5 border border-slate-200">{s.village_name || '—'}</td>
              <td className="px-3 py-1.5 border border-slate-200 text-slate-400">
                {s.created_at ? new Date(s.created_at).toLocaleDateString('en-IN') : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-slate-400 text-center mt-3">Total: {students.length} students</p>
    </div>
  )
}

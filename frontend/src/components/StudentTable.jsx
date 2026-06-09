import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteModal from './DeleteModal'

export default function StudentTable({ students, loading, onDelete }) {
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState(null)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin mb-3" />
        Loading students...
      </div>
    )
  }

  if (!students?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <div className="text-5xl mb-3">📭</div>
        <p className="font-medium">No students found</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary-800 text-white">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Father's Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Class</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Village</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => (
              <tr key={s.id} className={`border-b border-slate-100 hover:bg-primary-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <td className="px-4 py-3 text-slate-400 text-xs">{idx + 1}</td>
                <td className="px-4 py-3 font-semibold text-slate-800">{s.name}</td>
                <td className="px-4 py-3 text-slate-600">{s.father_name}</td>
                <td className="px-4 py-3">
                  <a href={`tel:${s.phone_number}`} className="text-primary-700 font-medium hover:underline">
                    {s.phone_number}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <span className="badge-green">{s.class_enrolled_display || s.class_enrolled}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="badge-blue">{s.village_name || '—'}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button
                      onClick={() => navigate(`/edit/${s.id}`)}
                      className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                      title="Edit"
                    >✏️</button>
                    <button
                      onClick={() => setDeleteTarget(s)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                      title="Delete"
                    >🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {students.map((s, idx) => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-slate-800">{s.name}</p>
                <p className="text-sm text-slate-500">S/o {s.father_name}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => navigate(`/edit/${s.id}`)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600">✏️</button>
                <button onClick={() => setDeleteTarget(s)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">🗑️</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="badge-green">{s.class_enrolled_display || s.class_enrolled}</span>
              <span className="badge-blue">📍 {s.village_name || '—'}</span>
              <a href={`tel:${s.phone_number}`} className="badge-amber">📞 {s.phone_number}</a>
            </div>
          </div>
        ))}
      </div>

      {deleteTarget && (
        <DeleteModal
          studentName={deleteTarget.name}
          onConfirm={() => { onDelete(deleteTarget.id); setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}

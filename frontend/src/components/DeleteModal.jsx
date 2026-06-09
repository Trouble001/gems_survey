import React from 'react'

export default function DeleteModal({ studentName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-2xl mb-2">🗑️</div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Student</h3>
        <p className="text-slate-500 text-sm mb-6">
          Are you sure you want to delete <strong className="text-slate-700">{studentName}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  )
}

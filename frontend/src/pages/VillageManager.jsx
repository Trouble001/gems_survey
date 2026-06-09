import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchVillages, addVillage, updateVillage, deleteVillage } from '../store/slices/villageSlice'

function DeleteVillageModal({ village, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-2xl mb-2">🗑️</div>
        <h3 className="text-lg font-bold mb-2">Delete Village</h3>
        <p className="text-slate-500 text-sm mb-6">
          Delete <strong>{village.name}</strong>?
          {village.student_count > 0 && (
            <span className="text-amber-600 block mt-1">
              ⚠️ {village.student_count} student(s) will be unlinked from this village.
            </span>
          )}
        </p>
        <div className="flex gap-3 justify-end">
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function VillageManager() {
  const dispatch = useDispatch()
  const { list: villages, loading } = useSelector(s => s.villages)

  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    dispatch(fetchVillages())
  }, [dispatch])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setAdding(true)
    try {
      await dispatch(addVillage({ name: newName.trim() })).unwrap()
      toast.success(`Village "${newName.trim()}" added!`)
      setNewName('')
    } catch (err) {
      const msg = err?.name?.[0] || 'Failed to add village'
      toast.error(msg)
    } finally {
      setAdding(false)
    }
  }

  const handleUpdate = async (id) => {
    if (!editName.trim()) return
    try {
      await dispatch(updateVillage({ id, data: { name: editName.trim() } })).unwrap()
      toast.success('Village updated!')
      setEditId(null)
    } catch (err) {
      const msg = err?.name?.[0] || 'Failed to update'
      toast.error(msg)
    }
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteVillage(id)).unwrap()
      toast.success('Village deleted')
      setDeleteTarget(null)
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-primary-900 mb-4">🏘️ Manage Villages</h1>

      {/* Add Village */}
      <div className="card mb-4">
        <h2 className="font-semibold text-slate-700 mb-3">Add New Village</h2>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Enter village name..."
            className="input flex-1"
          />
          <button type="submit" className="btn btn-primary" disabled={adding || !newName.trim()}>
            {adding ? '⏳' : '+ Add'}
          </button>
        </form>
      </div>

      {/* Village List */}
      <div className="card">
        <h2 className="font-semibold text-slate-700 mb-3">
          All Villages
          <span className="ml-2 text-xs text-slate-400 font-normal">({villages.length} total)</span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : villages.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <div className="text-4xl mb-2">🏘️</div>
            <p>No villages yet. Add your first village above!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {villages.map(v => (
              <div key={v.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                {editId === v.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="input flex-1 py-1.5 text-sm"
                      autoFocus
                      onKeyDown={e => { if (e.key === 'Enter') handleUpdate(v.id); if (e.key === 'Escape') setEditId(null) }}
                    />
                    <button className="btn btn-primary btn-sm py-1.5 px-3 text-xs" onClick={() => handleUpdate(v.id)}>Save</button>
                    <button className="btn btn-ghost py-1.5 px-3 text-xs" onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <span className="font-medium text-slate-800">{v.name}</span>
                      <span className="ml-2 text-xs text-slate-400">{v.student_count} student(s)</span>
                    </div>
                    <button
                      onClick={() => { setEditId(v.id); setEditName(v.name) }}
                      className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                      title="Edit"
                    >✏️</button>
                    <button
                      onClick={() => setDeleteTarget(v)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                      title="Delete"
                    >🗑️</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteVillageModal
          village={deleteTarget}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

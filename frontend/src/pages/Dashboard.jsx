import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { fetchStudents, deleteStudent, exportExcel, fetchStats } from '../store/slices/studentSlice'
import { fetchVillages } from '../store/slices/villageSlice'
import StudentTable from '../components/StudentTable'
import VillageFilter from '../components/VillageFilter'

export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { list: students, loading, exportLoading, stats } = useSelector(s => s.students)
  const { list: villages } = useSelector(s => s.villages)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchVillages())
    dispatch(fetchStats())
  }, [dispatch])

  const handleSearch = (e) => {
    const val = e.target.value
    setSearch(val)
    dispatch(fetchStudents(val ? { search: val } : {}))
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteStudent(id)).unwrap()
      toast.success('Student deleted')
      dispatch(fetchStats())
    } catch {
      toast.error('Failed to delete')
    }
  }

  const handleExport = async () => {
    try {
      await dispatch(exportExcel({})).unwrap()
      toast.success('Excel downloaded!')
    } catch {
      toast.error('Export failed')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div className="card text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Students</p>
          <p className="text-4xl font-black text-primary-800 mt-1">{stats.total_students}</p>
        </div>
        <div className="card text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Villages Covered</p>
          <p className="text-4xl font-black text-primary-800 mt-1">{stats.villages_visited}</p>
        </div>
        <div className="card text-center col-span-2 md:col-span-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Villages</p>
          <p className="text-4xl font-black text-primary-800 mt-1">{stats.total_villages}</p>
        </div>
      </div>

      <div className="card">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h1 className="text-xl font-bold text-primary-900">📋 All Students</h1>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-success" onClick={handleExport} disabled={exportLoading}>
              {exportLoading ? '⏳...' : '📊 Excel'}
            </button>
            <button className="btn btn-amber no-print" onClick={() => window.open('/print', '_blank')}>
              🖨️ Print
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/add')}>
              + Add Student
            </button>
          </div>
        </div>

        {/* Village filter */}
        <VillageFilter villages={villages} currentVillageId={null} />

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search by name, phone, village..."
            value={search}
            onChange={handleSearch}
            className="input pl-9"
          />
        </div>

        <StudentTable students={students} loading={loading} onDelete={handleDelete} />

        <p className="text-xs text-slate-400 mt-3">Showing {students.length} student(s)</p>
      </div>
    </div>
  )
}

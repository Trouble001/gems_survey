import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { fetchStudents, deleteStudent, exportExcel } from '../store/slices/studentSlice'
import { fetchVillages } from '../store/slices/villageSlice'
import StudentTable from '../components/StudentTable'
import VillageFilter from '../components/VillageFilter'

export default function VillageWiseView() {
  const { villageId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { list: students, loading, exportLoading } = useSelector(s => s.students)
  const { list: villages } = useSelector(s => s.villages)

  const currentVillage = villages.find(v => String(v.id) === villageId)

  useEffect(() => {
    dispatch(fetchStudents({ village_id: villageId }))
    dispatch(fetchVillages())
  }, [villageId, dispatch])

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteStudent(id)).unwrap()
      toast.success('Student deleted')
      dispatch(fetchStudents({ village_id: villageId }))
    } catch {
      toast.error('Failed to delete')
    }
  }

  const handleExport = async () => {
    try {
      await dispatch(exportExcel({ village_id: villageId })).unwrap()
      toast.success('Excel downloaded!')
    } catch {
      toast.error('Export failed')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h1 className="text-xl font-bold text-primary-900">
          📍 {currentVillage?.name || 'Village'}
          <span className="text-base font-normal text-slate-400 ml-2">({students.length} students)</span>
        </h1>
        <div className="flex gap-2">
          <button className="btn btn-success" onClick={handleExport} disabled={exportLoading}>
            {exportLoading ? '⏳...' : '📊 Excel'}
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/')}>← All Students</button>
        </div>
      </div>

      <div className="card">
        <VillageFilter villages={villages} currentVillageId={villageId} />
        <StudentTable students={students} loading={loading} onDelete={handleDelete} />
      </div>
    </div>
  )
}

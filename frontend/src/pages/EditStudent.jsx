import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { updateStudent } from '../store/slices/studentSlice'
import { studentAPI } from '../services/api'
import StudentForm from '../components/StudentForm'

export default function EditStudent() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(s => s.students)
  const [studentData, setStudentData] = useState(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    studentAPI.getById(id)
      .then(res => { setStudentData(res.data); setFetching(false) })
      .catch(() => { toast.error('Student not found'); navigate('/') })
  }, [id, navigate])

  const handleSubmit = async (data) => {
    try {
      await dispatch(updateStudent({ id: Number(id), data })).unwrap()
      toast.success('Student updated! ✅')
      navigate('/')
    } catch (err) {
      const msg = err?.phone_number?.[0] || err?.detail || 'Failed to update'
      toast.error(msg)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-primary-900 mb-4">✏️ Edit Student — {studentData?.name}</h1>
      <div className="card">
        <StudentForm initialData={studentData} onSubmit={handleSubmit} loading={loading} submitLabel="Update Student" />
      </div>
    </div>
  )
}

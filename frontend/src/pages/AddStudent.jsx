import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { addStudent } from '../store/slices/studentSlice'
import StudentForm from '../components/StudentForm'

export default function AddStudent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(s => s.students)

  const handleSubmit = async (data) => {
    try {
      await dispatch(addStudent(data)).unwrap()
      toast.success('Student added! 🎉')
      navigate('/')
    } catch (err) {
      const msg = err?.phone_number?.[0] || err?.detail || 'Failed to add student'
      toast.error(msg)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-primary-900 mb-4">➕ Add New Student</h1>
      <div className="card">
        <StudentForm onSubmit={handleSubmit} loading={loading} submitLabel="Add Student" />
      </div>
    </div>
  )
}

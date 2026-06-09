import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchVillages } from '../store/slices/villageSlice'

const CLASS_CHOICES = [
  'Nursery','LKG','UKG',
  '1','2','3','4','5','6','7','8','9','10','11','12',
  'Basic Computer','DCA','BCA','PGDCA',
]

const CLASS_LABELS = {
  'Nursery':'Nursery','LKG':'LKG','UKG':'UKG',
  '1':'Class 1','2':'Class 2','3':'Class 3','4':'Class 4','5':'Class 5',
  '6':'Class 6','7':'Class 7','8':'Class 8','9':'Class 9','10':'Class 10',
  '11':'Class 11','12':'Class 12',
  'Basic Computer':'Basic Computer','DCA':'DCA','BCA':'BCA','PGDCA':'PGDCA',
}

const INITIAL = { name: '', father_name: '', phone_number: '', class_enrolled: '', village: '' }

export default function StudentForm({ initialData, onSubmit, loading, submitLabel = 'Save Student' }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { list: villages } = useSelector((s) => s.villages)
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(fetchVillages())
  }, [dispatch])

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        father_name: initialData.father_name || '',
        phone_number: initialData.phone_number || '',
        class_enrolled: initialData.class_enrolled || '',
        village: initialData.village || '',
      })
    }
  }, [initialData])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.father_name.trim()) e.father_name = "Father's name is required"
    if (!form.phone_number.trim()) e.phone_number = 'Phone number is required'
    else if (form.phone_number.replace(/\D/g, '').length < 10) e.phone_number = 'Enter valid 10-digit number'
    if (!form.class_enrolled) e.class_enrolled = 'Select a class'
    if (!form.village) e.village = 'Select a village'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Name */}
        <div>
          <label className="label">Student Name *</label>
          <input
            name="name" value={form.name} onChange={handleChange}
            placeholder="Full name"
            className={`input ${errors.name ? 'input-error' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Father Name */}
        <div>
          <label className="label">Father's Name *</label>
          <input
            name="father_name" value={form.father_name} onChange={handleChange}
            placeholder="Father's full name"
            className={`input ${errors.father_name ? 'input-error' : ''}`}
          />
          {errors.father_name && <p className="text-red-500 text-xs mt-1">{errors.father_name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone Number *</label>
          <input
            name="phone_number" value={form.phone_number} onChange={handleChange}
            placeholder="10-digit mobile number"
            className={`input ${errors.phone_number ? 'input-error' : ''}`}
          />
          {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
        </div>

        {/* Class */}
        <div>
          <label className="label">Class Enrolled *</label>
          <select
            name="class_enrolled" value={form.class_enrolled} onChange={handleChange}
            className={`input ${errors.class_enrolled ? 'input-error' : ''}`}
          >
            <option value="">-- Select Class --</option>
            {CLASS_CHOICES.map(c => (
              <option key={c} value={c}>{CLASS_LABELS[c]}</option>
            ))}
          </select>
          {errors.class_enrolled && <p className="text-red-500 text-xs mt-1">{errors.class_enrolled}</p>}
        </div>

        {/* Village Dropdown */}
        <div className="md:col-span-2">
          <label className="label">Village *</label>
          <select
            name="village" value={form.village} onChange={handleChange}
            className={`input ${errors.village ? 'input-error' : ''}`}
          >
            <option value="">-- Select Village --</option>
            {villages.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
          {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village}</p>}
          {villages.length === 0 && (
            <p className="text-amber-600 text-xs mt-1">
              ⚠️ No villages added yet.{' '}
              <a href="/villages" className="underline font-semibold">Add villages first →</a>
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '⏳ Saving...' : `💾 ${submitLabel}`}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </form>
  )
}

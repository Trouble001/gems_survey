import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { studentAPI } from '../../services/api'

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await studentAPI.getAll(params)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch students')
    }
  }
)

export const fetchStats = createAsyncThunk(
  'students/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await studentAPI.getStats()
      return res.data
    } catch (err) {
      return rejectWithValue('Failed to fetch stats')
    }
  }
)

export const addStudent = createAsyncThunk(
  'students/add',
  async (data, { rejectWithValue }) => {
    try {
      const res = await studentAPI.create(data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to add student')
    }
  }
)

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await studentAPI.update(id, data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to update student')
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, { rejectWithValue }) => {
    try {
      await studentAPI.delete(id)
      return id
    } catch (err) {
      return rejectWithValue('Failed to delete student')
    }
  }
)

export const exportExcel = createAsyncThunk(
  'students/exportExcel',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await studentAPI.exportExcel(params)
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'students_data.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      return true
    } catch {
      return rejectWithValue('Failed to export')
    }
  }
)

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    list: [],
    loading: false,
    error: null,
    exportLoading: false,
    stats: { total_students: 0, total_villages: 0, villages_visited: 0 },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchStudents.fulfilled, (s, a) => { s.loading = false; s.list = a.payload })
      .addCase(fetchStudents.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      .addCase(fetchStats.fulfilled, (s, a) => { s.stats = a.payload })

      .addCase(addStudent.pending, (s) => { s.loading = true })
      .addCase(addStudent.fulfilled, (s, a) => { s.loading = false; s.list.unshift(a.payload) })
      .addCase(addStudent.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      .addCase(updateStudent.pending, (s) => { s.loading = true })
      .addCase(updateStudent.fulfilled, (s, a) => {
        s.loading = false
        const idx = s.list.findIndex(x => x.id === a.payload.id)
        if (idx !== -1) s.list[idx] = a.payload
      })
      .addCase(updateStudent.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      .addCase(deleteStudent.pending, (s) => { s.loading = true })
      .addCase(deleteStudent.fulfilled, (s, a) => {
        s.loading = false
        s.list = s.list.filter(x => x.id !== a.payload)
      })
      .addCase(deleteStudent.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      .addCase(exportExcel.pending, (s) => { s.exportLoading = true })
      .addCase(exportExcel.fulfilled, (s) => { s.exportLoading = false })
      .addCase(exportExcel.rejected, (s) => { s.exportLoading = false })
  },
})

export default studentSlice.reducer

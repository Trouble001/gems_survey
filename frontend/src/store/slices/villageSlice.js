import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { villageAPI } from '../../services/api'

export const fetchVillages = createAsyncThunk(
  'villages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await villageAPI.getAll()
      return res.data
    } catch (err) {
      return rejectWithValue('Failed to fetch villages')
    }
  }
)

export const addVillage = createAsyncThunk(
  'villages/add',
  async (data, { rejectWithValue }) => {
    try {
      const res = await villageAPI.create(data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to add village')
    }
  }
)

export const updateVillage = createAsyncThunk(
  'villages/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await villageAPI.update(id, data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to update village')
    }
  }
)

export const deleteVillage = createAsyncThunk(
  'villages/delete',
  async (id, { rejectWithValue }) => {
    try {
      await villageAPI.delete(id)
      return id
    } catch (err) {
      return rejectWithValue('Failed to delete village')
    }
  }
)

const villageSlice = createSlice({
  name: 'villages',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVillages.pending, (s) => { s.loading = true })
      .addCase(fetchVillages.fulfilled, (s, a) => { s.loading = false; s.list = a.payload })
      .addCase(fetchVillages.rejected, (s, a) => { s.loading = false; s.error = a.payload })

      .addCase(addVillage.fulfilled, (s, a) => {
        s.list.push(a.payload)
        s.list.sort((a, b) => a.name.localeCompare(b.name))
      })

      .addCase(updateVillage.fulfilled, (s, a) => {
        const idx = s.list.findIndex(v => v.id === a.payload.id)
        if (idx !== -1) s.list[idx] = a.payload
      })

      .addCase(deleteVillage.fulfilled, (s, a) => {
        s.list = s.list.filter(v => v.id !== a.payload)
      })
  },
})

export default villageSlice.reducer

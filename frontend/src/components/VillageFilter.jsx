import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function VillageFilter({ villages, currentVillageId }) {
  const navigate = useNavigate()

  if (!villages?.length) return null

  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Filter by Village</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => navigate('/')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
            !currentVillageId
              ? 'bg-primary-800 border-primary-800 text-white'
              : 'bg-white border-slate-200 text-slate-500 hover:border-primary-800 hover:text-primary-800'
          }`}
        >
          🌍 All Villages
        </button>
        {villages.map(v => (
          <button
            key={v.id}
            onClick={() => navigate(`/village/${v.id}`)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
              currentVillageId === String(v.id)
                ? 'bg-primary-800 border-primary-800 text-white'
                : 'bg-white border-slate-200 text-slate-500 hover:border-primary-800 hover:text-primary-800'
            }`}
          >
            {v.name}
            {v.student_count > 0 && (
              <span className="ml-1 opacity-70">({v.student_count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

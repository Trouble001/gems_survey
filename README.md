# 🏫 HiTech Admission Survey v2

Django + PostgreSQL backend · Vite + React + Tailwind frontend

---

## 📁 Structure

```
hitech2/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── school_api/       ← Django project
│   └── students/         ← App (models, views, urls)
└── frontend/
    ├── package.json      ← Vite + React + Tailwind
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── store/        ← Redux Toolkit
        ├── components/   ← StudentForm, Table, etc.
        ├── pages/        ← Dashboard, Add, Edit, Villages, Print
        └── services/     ← Axios API
```

---

## ⚙️ Backend Setup

```bash
cd backend

# 1. Virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# 2. Install
pip install -r requirements.txt

# 3. Create .env
cp .env.example .env
# Edit .env — set your DATABASE_URL

# 4. Migrate
python manage.py makemigrations
python manage.py migrate

# 5. Admin user
python manage.py createsuperuser

# 6. Run
python manage.py runserver
```

Backend: **http://localhost:8000**

---

## 🖥️ Frontend Setup

```bash
cd frontend

# 1. Install (clean, fast — Vite!)
npm install

# 2. Create .env
cp .env.example .env

# 3. Run
npm run dev
```

Frontend: **http://localhost:5173**

---

## 🗄️ Database

### Local PostgreSQL

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/hitech_db
```

### SQLite (no Postgres installed)

Leave DATABASE_URL empty in .env — falls back to SQLite automatically.

### Neon.tech (free cloud Postgres)

```
DATABASE_URL=postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require
```

---

## 🌐 API Endpoints

| Method | URL                           | Description       |
| ------ | ----------------------------- | ----------------- |
| GET    | `/api/students/`              | All students      |
| GET    | `/api/students/?search=Ram`   | Search            |
| GET    | `/api/students/?village_id=1` | Filter by village |
| POST   | `/api/students/`              | Add student       |
| PUT    | `/api/students/{id}/`         | Update            |
| DELETE | `/api/students/{id}/`         | Delete            |
| GET    | `/api/students/export-excel/` | Download Excel    |
| GET    | `/api/students/stats/`        | Dashboard stats   |
| GET    | `/api/villages/`              | All villages      |
| POST   | `/api/villages/`              | Add village       |
| PUT    | `/api/villages/{id}/`         | Edit village      |
| DELETE | `/api/villages/{id}/`         | Delete village    |

---

## ✨ Features

- ✅ Add / Edit / Delete students
- ✅ Village dropdown (from DB — not hardcoded)
- ✅ Manage villages (add/edit/delete)
- ✅ Filter students by village
- ✅ Search students
- ✅ Dashboard stats (total students + villages covered)
- ✅ Export Excel (all or village-wise)
- ✅ Print view (A4 landscape)
- ✅ Mobile responsive
- ✅ PostgreSQL ready

---

## 🚀 Free Deployment

| Service    | What           |
| ---------- | -------------- |
| Render.com | Django backend |
| Neon.tech  | PostgreSQL DB  |
| Vercel.com | React frontend |

Set env vars on each platform and deploy!

postgresql://neondb_owner:npg_8L1TsSOmEXHZ@ep-gentle-tree-aobk3dri.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

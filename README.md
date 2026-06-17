# InventoryPulse

A full-stack inventory management system with a React frontend and a FastAPI backend backed by PostgreSQL.

---

## Project Structure

```
Inventorypulse/
├── inventorypulse-backend-/   # FastAPI REST API
└── inventorypulse-frontend-/  # React + Vite SPA
```

---

## Features

- **Dashboard** — summary of total products, inventory value, low stock count, active alerts, and stock movement 
- **Products** — list, search, filter by category or low stock, create, update, and soft-delete products
- **Stock In / Out** — record stock movements with supplier linking, cost tracking, and automatic alert evaluation
- **Alerts** — automatic low-stock alerts triggered on every stock movement; admin can resolve them
- **Reports** — inventory valuation report, stock movement summary, and CSV export
- **Users** — admin-only user management with role-based access (admin / staff)
- **Authentication** — Firebase Auth (email/password and Google sign-in) on the frontend; JWT-based auth on the backend API

---

## Tech Stack

| Frontend | React , Vite, Tailwind CSS , React Router v7,
| Auth | Firebase Authentication |
| Backend | FastAPI
| Database | PostgreSQL 16 |
| Containerisation | Docker

---

### Backend

```bash
cd inventorypulse-backend-
```

1. Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Key variables in `.env`:

```env
DATABASE_URL=postgresql://admin:secret@localhost:5432/inventorypulse
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
FRONTEND_ORIGIN=http://localhost:5173
```

2. Start the database:

```bash
docker compose up -d db
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run migrations and seed the database:

```bash
alembic upgrade head
python seed.py
```

5. Start the API server:

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

#### Default seeded admin account

| Field | Value |
|---|---|
| Email | admin@inventorypulse.com |
| Password | Admin@1234 |

---

### Frontend

```bash
cd inventorypulse-frontend-
```

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

> The frontend expects the backend to be running at `http://localhost:8000/api`. This is set in `src/services/api.js`.

---

### Running with Docker (Backend + Database)

```bash
cd inventorypulse-backend-
docker compose up --build
```

This starts both PostgreSQL and the FastAPI server, runs migrations, and seeds the database automatically.

---

## API Overview

All routes are prefixed with the path shown. Protected routes require a `Bearer` JWT token in the `Authorization` header.

| Prefix | Description | Auth |
|---|---|---|
| `POST /auth/login` | Get a JWT token | Public |
| `GET /products` | List products (search, filter) | Required |
| `POST /products` | Create a product | Admin only |
| `PUT /products/{id}` | Update a product | Admin only |
| `DELETE /products/{id}` | Soft-delete a product | Admin only |
| `GET /stock/movements` | List stock movements | Required |
| `POST /stock/in` | Record a stock-in | Required |
| `POST /stock/out` | Record a stock-out | Required |
| `GET /dashboard/summary` | Dashboard stats | Required |
| `GET /alerts` | List active alerts | Required |
| `POST /alerts/{id}/resolve` | Resolve an alert | Admin only |
| `GET /reports/inventory-valuation` | Valuation report | Required |
| `GET /reports/stock-movement-summary` | Movement summary | Required |
| `GET /reports/export/csv` | Export inventory as CSV | Required |
| `GET /users` | List users | Admin only |
| `POST /users` | Create a user | Admin only |
| `PUT /users/{id}` | Update a user | Admin only |
| `DELETE /users/{id}` | Deactivate a user | Admin only |

---

## Roles

| Role | Access |
|---|---|
| `admin` | Full access including user management, product creation/deletion, and alert resolution |
| `staff` | Can view products, record stock movements, view reports and alerts |

# Smart Finance

Aplikacja do zarzadzania wydatkami/przychodami:

- frontend: React (CRA)
- backend: Express + MongoDB (Mongoose)

## Architektura deploy

- Frontend: Vercel
- Backend API: Render
- Baza danych: MongoDB Atlas (lub inny MongoDB URI)

## Czy sam MongoDB wystarczy bez Render?

Nie. MongoDB to tylko baza danych. Nadal potrzebujesz runtime dla API (`backend/server.js`), bo frontend wysyla zapytania do endpointow takich jak `/auth/*` i `/transaction/*`.

## Szybki start lokalnie

1. Zainstaluj zaleznosci w root:

```bash
npm install
```

2. Skonfiguruj backend:

```bash
cp backend/.env.example backend/.env
```

3. Ustaw frontend API URL:

```bash
cp frontend/.env.example frontend/.env
```

4. Uruchom oba serwisy:

```bash
npm run dev
```

## Zmienne srodowiskowe

### Backend (`backend/.env`)

```env
PORT=8000
DATABASE_URL=mongodb+srv://...
SECRET=very_long_random_secret
FRONTEND_URL=http://localhost:3000,https://twoj-frontend.vercel.app
```

### Frontend (Vercel Env)

```env
REACT_APP_API_URL=https://twoj-backend.onrender.com/
```

Uwaga: koncowy slash w `REACT_APP_API_URL` jest OK dla obecnego kodu axios.

## Deployment krok po kroku

### 1) Backend na Render

1. Podlacz repozytorium w Render.
2. Utworz `Web Service` z katalogu `backend`.
3. Ustaw:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/health`
   - Node: `20.19.0` lub nowszy
4. Dodaj envy: `DATABASE_URL`, `SECRET`, `FRONTEND_URL`, `PORT=8000`.
5. Po deployu skopiuj URL backendu, np. `https://finance-planner-backend.onrender.com`.

(Alternatywnie mozesz skorzystac z `render.yaml` z roota repo.)

### 2) Frontend na Vercel

1. Podlacz repozytorium i jako Root Directory ustaw `frontend`.
2. Ustaw ENV:
   - `REACT_APP_API_URL=https://finance-planner-backend.onrender.com/`
3. Wdrozenie wykona `npm run build` automatycznie.
4. `frontend/vercel.json` ma rewrite do `index.html`, wiec routing React powinien dzialac bez 404 na odswiezeniu.

## Health check

Backend endpoint:

```text
GET /health
```

## Typowe problemy

- CORS error: sprawdz `FRONTEND_URL` w backendzie (musi zawierac dokladny adres Vercel).
- 404 po odswiezeniu frontend route: sprawdz czy Vercel bierze `frontend/vercel.json`.
- 500 na API: sprawdz `DATABASE_URL` i `SECRET` w Render env.

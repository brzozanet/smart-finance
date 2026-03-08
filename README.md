# 💸 Smart Finance Kapu$ta

![Screenshot App](https://raw.githubusercontent.com/brzozanet/smart-finance/main/frontend/public/gh-cover-goit-smart-finance-1.jpg)

![Screenshot App](https://raw.githubusercontent.com/brzozanet/smart-finance/main/frontend/public/gh-cover-goit-smart-finance-2.jpg)

![Screenshot App](https://raw.githubusercontent.com/brzozanet/smart-finance/main/frontend/public/gh-cover-goit-smart-finance-3.jpg)

Smart Finance Kapu$ta to praktyczny projekt full-stack do zarządzania domowym budżetem z autoryzacją, API i bazą MongoDB. Jest to aplikacja do zarządzania domowymi finansami: przychodami, wydatkami, saldem konta, historią transakcji i raportami miesięcznymi. Projekt składa się z frontendu w React oraz backendu API w Express, z bazą danych MongoDB (Atlas/lokalnie).

## 🌐 Demo

### 🚀 Wersja online

Aplikacja jest dostępna online pod adresem:

**👉 [https://smart-finance-kapusta.vercel.app/](https://smart-finance-kapusta.vercel.app/)**

**Platformy:**

- **Frontend**: [Vercel](https://vercel.com) - hosting aplikacji React (CRA)
- **Backend**: [Render](https://render.com) - hosting API Express
- **Database**: MongoDB Atlas

**⚠️ Ważne informacje:**

- **Cold Start**: Backend na Render (darmowy plan) może potrzebować kilkunastu sekund po dłuższej bezczynności.
- **CORS**: Backend akceptuje originy z `FRONTEND_URL` (wspiera tez wildcard `https://*.vercel.app`).

### 🔐 Testowy użytkownik

Do szybkiego sprawdzenia aplikacji na wersji online możesz użyć konta testowego:

- **Login**: `user@testing.com`
- **Hasło**: `testinguser`

### 📦 Architektura

Aplikacja składa się z dwóch części:

- **Frontend**: React + Redux Toolkit + React Router, hostowany na Vercel
- **Backend**: Express + Mongoose + JWT auth, hostowany na Render

## 🛠 Użyte technologie

### Frontend

- **React 18**
- **React Router DOM 7**
- **Redux Toolkit + React Redux**
- **Axios**
- **Chart.js + react-chartjs-2 + chartjs-plugin-datalabels**
- **react-datepicker + moment**
- **CSS Modules**

### Backend

- **Node.js + Express 5**
- **MongoDB + Mongoose**
- **JWT + Passport + passport-jwt**
- **bcryptjs**
- **Joi** (walidacja)
- **cors, dotenv, morgan**

### Narzędzia deweloperskie

- **npm workspaces** (frontend + backend)
- **ESLint (react-scripts)**
- **Git & GitHub**

## 📂 Struktura aplikacji

```
smart-finance/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Balance/
│   │   │   ├── Expenses/
│   │   │   ├── Income/
│   │   │   ├── CategoryList/
│   │   │   ├── Chart/
│   │   │   ├── DatePickerForm/
│   │   │   ├── LoginForm/
│   │   │   ├── PrivateRoute/
│   │   │   ├── ProtectedRoute/
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── LoginPage/
│   │   │   ├── TransactionsPage/
│   │   │   └── ReportsPage/
│   │   ├── hooks/
│   │   ├── redux/
│   │   │   ├── user/
│   │   │   ├── expenses/
│   │   │   ├── incomes/
│   │   │   └── reports/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── auth/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── helpers/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── render.yaml
└── README.md
```

## 📋 Dostępne strony

- **/** - ekran logowania/rejestracji
- **/transactions/expenses** - lista wydatków + formularz dodawania
- **/transactions/income** - lista przychodów + formularz dodawania
- **/reports** - raporty z podziałem na kategorie i wykres

## 🚀 Jak uruchomić aplikację

### Wymagania wstępne

- Node.js (LTS, dla backendu zalecane >= 20.19.0)
- npm

### Instalacja i uruchomienie

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/brzozanet/smart-finance.git
   cd smart-finance
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Skonfiguruj backend:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Przykład `backend/.env`:

   ```env
   PORT=8000
   DATABASE_URL=mongodb://127.0.0.1:27017/finance_planner
   SECRET=replace_with_long_random_secret
   FRONTEND_URL=http://localhost:3000
   ```

4. Skonfiguruj frontend:

   ```bash
   cp frontend/.env.example frontend/.env
   ```

   Przykład `frontend/.env`:

   ```env
   REACT_APP_API_URL=http://localhost:8000/
   ```

5. Uruchom aplikację (frontend + backend):

   ```bash
   npm run dev
   ```

   Frontend: [http://localhost:3000](http://localhost:3000)

## 🌐 API Endpoints

Backend udostępnia następujące endpointy:

- `GET /health` - health check API
- `POST /auth/register` - rejestracja użytkownika
- `POST /auth/login` - logowanie (JWT)
- `POST /auth/logout` - wylogowanie (wymaga auth)
- `PATCH /auth/balance` - aktualizacja salda (wymaga auth)
- `POST /transaction/expense` - dodanie wydatku (wymaga auth)
- `POST /transaction/income` - dodanie przychodu (wymaga auth)
- `DELETE /transaction/:transactionId` - usunięcie transakcji (wymaga auth)
- `GET /transaction/expense` - lista/statystyki wydatków (wymaga auth)
- `GET /transaction/income` - lista/statystyki przychodów (wymaga auth)

## ✨ Funkcjonalności

### Zaimplementowane

- 🔐 Rejestracja i logowanie użytkownika (JWT)
- 👤 Ochrona tras (`ProtectedRoute`, `PrivateRoute`)
- 💰 Zarządzanie saldem konta
- 🧾 Dodawanie i usuwanie wydatków
- 📊 Podsumowania miesięczne (expense/income)
- 🗂 Raporty kategorii + wykres słupkowy
- 📅 Formularz daty (DatePicker) przy dodawaniu transakcji
- 📱 Responsywny interfejs (mobile + desktop)
- ⚠️ Komunikaty błędów walidacji logowania/rejestracji

### Ważne doprecyzowanie stanu projektu

- Backend wspiera operacje dla przychodów i wydatków.
- W aktualnym frontendzie część przychodów/raportów korzysta z danych pomocniczych `redux/fakeDb.js` (do mockowania widoków), podczas gdy wydatki są zintegrowane z API.

## 📝 Uwagi

- Aplikacja wymaga działającego backendu, aby poprawnie obsługiwać autoryzację i operacje finansowe.
- W produkcji backend łączy się z MongoDB Atlas przez `DATABASE_URL`.
- Jeśli backend jest usypiany na Render, pierwsze zapytanie może być wolniejsze.

### 🌐 Deployment

Projekt jest zdeployowany na:

- **Frontend**: [https://smart-finance-kapusta.vercel.app/](https://smart-finance-kapusta.vercel.app/)
- **Backend**: [https://smart-finance-backend-egfl.onrender.com](https://smart-finance-backend-egfl.onrender.com)

#### Ustawienia produkcyjne ENV

Backend (Render):

```env
PORT=8000
DATABASE_URL=mongodb+srv://<DB_USER>:<DB_PASS>@<CLUSTER_HOST>/<DB_NAME>?retryWrites=true&w=majority
SECRET=<LONG_RANDOM_SECRET>
FRONTEND_URL=https://smart-finance-kapusta.vercel.app,https://*.vercel.app
```

Frontend (Vercel):

```env
REACT_APP_API_URL=https://smart-finance-backend-egfl.onrender.com/
```

## 🎯 Status projektu

✅ Projekt działa na produkcji (Vercel + Render).

🛠 Trwa dalsze porządkowanie warstwy danych na froncie (pełna unifikacja API dla raportów i przychodów).

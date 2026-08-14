# AbleSpace Task Management System

A full-stack Task Management System built as part of an assessment. The application features a clean, minimalistic design inspired by modern productivity tools, supporting multiple views (Kanban Board and List) and full Light/Dark mode capabilities.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Theme:** `next-themes` (Light/Dark Mode)
- **HTTP Client:** Axios

### Backend
 - **Framework:** NestJS
 - **Database:** MongoDB
 - **ODM:** Mongoose
- **Validation:** `class-validator` and `class-transformer`

## ✨ Features

- **Minimalist Guest Login:** A clean entry point that mimics a guest session login.
- **Multiple Views:**
  - **Kanban Board:** Organize tasks into "To Do", "Doing", "Completed", and "On Hold" columns.
  - **List View:** An accordion-style data table summarizing tasks by status.
- **Dynamic Fields Toggle:** Users can toggle the visibility of specific task metadata (Priority, Members, Due Date, etc.) across both views.
- **Theme Support:** Full Light Mode and Dark Mode support that persists across reloads.
- **Full CRUD API:** Create, Read, Update, and Delete tasks directly interacting with a local SQLite database.

## 📂 Project Structure

This repository contains both the frontend and backend applications:

```text
AbleSpace/
├── frontend/        # Next.js React application
└── backend/         # NestJS application and SQLite database
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)

### 1. Backend Setup (NestJS + MongoDB)

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
```

Create a local `.env` (do not commit secrets) or set `MONGODB_URI` in your environment. Example `.env` content:

```text
# .env (example - DO NOT COMMIT)
MONGODB_URI="mongodb://localhost/ablespace"
```

Install the dependencies:

```bash
npm install
```

Start the backend server in development mode (ensure `MONGODB_URI` is set):

```bash
npm run start:dev
```
*The backend will run on `http://localhost:3001` and connect to MongoDB using the `MONGODB_URI` environment variable.*

### 2. Frontend Setup (Next.js)

Open a **new** terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```
*The frontend will run on `http://localhost:3000`.*

## 🔗 API Endpoints

The backend exposes the following RESTful endpoints under `/tasks`:

- `GET /tasks` - Retrieve all tasks
- `GET /tasks/:id` - Retrieve a specific task by ID
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

## 💡 Usage

1. Start both the backend and frontend servers as described above.
2. Navigate to `http://localhost:3000` in your web browser.
3. Click **"Continue as Guest"** on the login page.
4. Manage your tasks using the Board or List views! Toggle the theme using the button in the bottom left of the sidebar.

# courseMS
# courseMS (NestJS + MySQL + React)

Monorepo gồm:

* `backend/`: NestJS API
* `frontend/`: React (Vite)
* `docker-compose.yml`: MySQL local

## 1) Prerequisites

* Node.js (LTS)
* Docker Desktop
* (khuyến nghị) pnpm hoặc npm

## 2) Start MySQL (Docker)

From project root:

* `docker compose up -d`

MySQL default:

* Host: `localhost`
* Port: `3306`
* Database: `coursems`
* User/Pass: (set trong docker-compose)

## 3) Backend (NestJS)

### Setup

* `cd backend`
* `cp .env.example .env` (nếu có)
* `npm install`

### Run

* `npm run start:dev`

Backend runs at:

* `http://localhost:3001` (hoặc PORT trong .env)

## 4) Frontend (React)

### Setup

* `cd frontend`
* `cp .env.example .env` (nếu có)
* `npm install`

### Run

* `npm run dev`

Frontend runs at:

* `http://localhost:5173`

## 5) Core Entities (MySQL)

* `courses`
* `lessons`
* `enrollments`
* `progress`

Rules:

* Unique `(user_id, course_id)` in enrollments
* Unique `(enrollment_id, lesson_id)` in progress
* Lessons ordered by `order_index` per course

## 6) Suggested API modules

* Courses: CRUD + list published
* Lessons: CRUD + list by courseId
* Enrollments: enroll/unenroll + list by userId
* Progress: upsert progress by enrollmentId + lessonId

## 7) IntelliJ performance note

Mark these as Excluded:

* `backend/node_modules`, `frontend/node_modules`
* `backend/dist`, `frontend/dist`
* `coverage`, logs


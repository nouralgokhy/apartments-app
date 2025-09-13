# Nawy Apartments App

## Overview
A **full-stack web application** for browsing and managing apartments.  

---

## Tech Stack
- **Backend**: Node.js, Express  
- **Database**: PostgreSQL + Prisma ORM  
- **Frontend**: Next.js, Tailwind CSS, Material UI  
- **Validation**: Zod
- **Testing**: Jest + Supertest
- **Documentation**: Swagger (OpenAPI)  
- **Infrastructure**: Docker & Docker Compose  

---

## Features
- Browse apartments with **pagination & filters**  
- View **apartment details** (gallery + stats)  
-  **form to add new apartments**  
- Swagger API docs 

---

## Setup

### Run with Docker
```bash
git clone https://github.com/nouralgokhy/apartments-app.git
cd apartments-app
docker compose up --build
````

**Services available:**

* FrontEnd: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:4000](http://localhost:4000)
* API Docs (Swagger): [http://localhost:4000/api-docs](http://localhost:4000/api-docs)
* The database runs inside Docker.
* Migrations and seed data are applied automatically.

---

## Environment Variables

Environment configuration files are provided as `.env.example`:

* **Backend** → `api/.env.example`
* **Frontend** → `web/apartments-app/.env.example`

Copy them to `.env` and adjust values if needed.

---

##  Seed Data

The database comes preloaded with **example projects and apartments**

---

## Tests

### Run API tests 
```bash
cd api
npm install
npm test
```

---

## Screenshots

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/92d3a76b-b65e-43ed-9762-1dce240c4861" />
<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/e682a697-e778-4d72-a1c8-69b1762482f3" />
<img width="975" height="549" alt="image" src="https://github.com/user-attachments/assets/7a6209d1-0f72-497d-b42b-4ac1e1b184b5" />






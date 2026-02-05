#Blood Bank Management System (MERN + TypeScript)
A full-stack Blood Bank Management System built with the MERN stack.
Tech Stack
Frontend: React + Vite + TypeScript + Tailwind
Backend: Node.js + Express + TypeScript
Database: MongoDB (Atlas)
Auth: JWT + bcrypt

#System Requirements
Install:
Node.js (LTS)
npm (comes with Node)

Verify:
node -v
npm -v

#Project Structure
Blood-Bank-Management-System/
│
├── frontend/   → React client (Vite)
├── backend/    → Express API (TypeScript)
└── README.md

⚡ Quick Start (Recommended)

#Open 2 terminals:
Terminal 1 – Backend
cd backend
npm install
npm run dev

Terminal 2 – Frontend
cd frontend
npm install
npm run dev

#FRONTEND SETUP (React + Vite)
Install dependencies
cd frontend
npm install

#Run development server
npm run dev

#Build for production
npm run build

#Preview production build
npm run preview

#Install additional packages (if needed)
Axios (API calls)
npm install axios

=========================
🚀 BACKEND SETUP (Node + Express + TS)
=========================
First time initialization
cd backend
npm init -y

#Install production dependencies
npm install express cors dotenv mongoose jsonwebtoken bcryptjs

#Install development dependencies
npm install -D typescript ts-node-dev \
@types/node @types/express @types/cors \
@types/bcryptjs @types/jsonwebtoken

#Setup TypeScript (first time)
npx tsc --init

#Check config:
npx tsc --showConfig

▶ Backend Scripts
Add this inside backend/package.json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "clean": "rm -rf dist"
}

#Run backend
Development (auto reload)
npm run dev

#Production
npm run build
npm start

=========================
🔐 Environment Variables
=========================
🔐 Environment Variables
Backend (.env)

Create:
backend/.env

Example:
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bloodbank
JWT_SECRET=your_secret_key
NODE_ENV=development


Frontend (.env)
Create:
frontend/.env
VITE_API_URL=http://localhost:5000/api

#Use in code:
import.meta.env.VITE_API_URL

🧪 API Testing
Example:
#Register donor
POST /api/donors

#Admin login
POST /api/admin/login

🧹 Useful Commands
#Clear npm cache
npm cache clean --force

Reinstall packages
rm -rf node_modules package-lock.json
npm install

✅ Features
Donor registration
Blood request system
Contact form
Admin dashboard
JWT authentication
Protected routes
MongoDB storage

👨‍💻 Author
Sheren
Graphic Designer & Developer

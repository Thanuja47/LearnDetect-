# LearnDetect Backend API

A Node.js + Express.js + MongoDB + Prisma backend for the LearnDetect reading assessment platform.

## 🚀 Features

- **Authentication**: JWT-based authentication with role-based access control
- **User Roles**: Student, Parent, Teacher, Admin
- **MVC Architecture**: Clean separation of concerns
- **Prisma ORM**: Type-safe database operations with MongoDB

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Seed data
├── src/
│   ├── config/
│   │   └── database.js    # Prisma client
│   ├── controllers/       # Route handlers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── student.controller.js
│   │   ├── parent.controller.js
│   │   ├── child.controller.js
│   │   ├── teacher.controller.js
│   │   ├── assessment.controller.js
│   │   ├── schedule.controller.js
│   │   ├── report.controller.js
│   │   └── admin.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   ├── routes/            # API routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── student.routes.js
│   │   ├── parent.routes.js
│   │   ├── child.routes.js
│   │   ├── teacher.routes.js
│   │   ├── assessment.routes.js
│   │   ├── schedule.routes.js
│   │   ├── report.routes.js
│   │   └── admin.routes.js
│   └── server.js          # Express app
├── .env.example
├── package.json
└── README.md
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your MongoDB connection string
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/learndetect"
JWT_SECRET="your-secret-key"
```

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

### 4. Push Database Schema

```bash
npm run prisma:migrate
```

### 5. Seed Database (Optional)

```bash
npm run seed
```

### 6. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/change-password` | Change password |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students/dashboard` | Get dashboard data |
| GET | `/api/students/profile` | Get profile |
| PUT | `/api/students/profile` | Update profile |
| GET | `/api/students/assessments` | Get assessments |
| GET | `/api/students/progress` | Get progress |
| GET | `/api/students/achievements` | Get achievements |
| GET | `/api/students/stats` | Get quick stats |

### Parents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parents/dashboard` | Get dashboard data |
| GET | `/api/parents/progress` | Get progress tracking |
| GET | `/api/parents/insights` | Get insights |

### Children (Parent's Children)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/children` | Get all children |
| GET | `/api/children/:id` | Get child by ID |
| POST | `/api/children` | Add new child |
| PUT | `/api/children/:id` | Update child |
| DELETE | `/api/children/:id` | Delete child |
| GET | `/api/children/:id/assessments` | Get child's assessments |
| GET | `/api/children/:id/progress` | Get child's progress |

### Teachers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teachers/dashboard` | Get dashboard data |
| GET | `/api/teachers/performance` | Get class performance |
| GET | `/api/teachers/students` | Get all students |
| GET | `/api/teachers/students/:id` | Get student by ID |
| POST | `/api/teachers/students` | Add student |
| PUT | `/api/teachers/students/:id` | Update student |
| DELETE | `/api/teachers/students/:id` | Remove student |

### Assessments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assessments` | Submit assessment (Student) |
| GET | `/api/assessments` | Get assessments |
| GET | `/api/assessments/:id` | Get assessment by ID |
| POST | `/api/assessments/child/:childId` | Submit child assessment (Parent) |

### Schedules
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schedules` | Get all schedules |
| GET | `/api/schedules/:id` | Get schedule by ID |
| POST | `/api/schedules` | Create schedule |
| PUT | `/api/schedules/:id` | Update schedule |
| DELETE | `/api/schedules/:id` | Delete schedule |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports` | Get all reports |
| GET | `/api/reports/child/:childId` | Get child's reports |
| GET | `/api/reports/:id` | Get report by ID |
| POST | `/api/reports` | Generate report |
| DELETE | `/api/reports/:id` | Delete report |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Get dashboard stats |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/analytics` | Get analytics |
| GET | `/api/admin/audit-logs` | Get audit logs |

## 🔐 Test Accounts (After Seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@learndetect.com | password123 |
| Teacher | teacher@learndetect.com | password123 |
| Parent | parent@learndetect.com | password123 |
| Student | student@learndetect.com | password123 |

## 🔧 Scripts

```bash
npm start           # Start production server
npm run dev         # Start development server with nodemon
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
npm run seed        # Seed database
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | MongoDB connection string | - |
| JWT_SECRET | Secret for JWT signing | - |
| JWT_EXPIRES_IN | Token expiration | 7d |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

# GYM Training Management System

## Project Overview
The **Training Management System** is designed to streamline the management of trainers, trainees, and training schedules. It facilitates creating and managing users (admins, trainers, and trainees), schedules, bookings, and other related operations. The system ensures smooth operations with features like schedule management, user authentication, and role-based access control.

---

## Relation Diagram
Below is the relational diagram for the backend system.

![Relational Diagram](https://prismaliser.app?code=Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiREFUQUJBU0VfVVJMIikKfQoKbW9kZWwgVXNlciB7CiAgaWQgICAgICAgIFN0cmluZyAgIEBpZCBAZGVmYXVsdCh1dWlkKCkpCiAgdXNlcm5hbWUgIFN0cmluZyAgIEB1bmlxdWUKICBlbWFpbCAgICAgU3RyaW5nICAgQHVuaXF1ZQogIHBhc3N3b3JkICBTdHJpbmcKICByb2xlICAgICAgUm9sZQogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdAoKICBhZG1pbiAgIEFkbWluPwogIHRyYWluZXIgVHJhaW5lcj8KICB0cmFpbmVlIFRyYWluZWU_Cn0KCm1vZGVsIEFkbWluIHsKICBpZCAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KHV1aWQoKSkKICB1c2VySWQgICAgU3RyaW5nICAgQHVuaXF1ZQogIGxvY2F0aW9uICBTdHJpbmc_CiAgdXNlciAgICAgIFVzZXIgICAgIEByZWxhdGlvbihmaWVsZHM6IFt1c2VySWRdLCByZWZlcmVuY2VzOiBbaWRdKQogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdAp9Cgptb2RlbCBUcmFpbmVyIHsKICBpZCAgICAgICAgICAgICBTdHJpbmcgICAgIEBpZCBAZGVmYXVsdCh1dWlkKCkpCiAgdXNlcklkICAgICAgICAgU3RyaW5nICAgICBAdW5pcXVlCiAgc3BlY2lhbGl6YXRpb24gU3RyaW5nPwogIGJpbyAgICAgICAgICAgIFN0cmluZz8KICBhZGRyZXNzICAgICAgICBTdHJpbmc_CiAgdXNlciAgICAgICAgICAgVXNlciAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSkKICBzY2hlZHVsZXMgICAgICBTY2hlZHVsZVtdCiAgY3JlYXRlZEF0ICAgICAgRGF0ZVRpbWUgICBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgICAgICBEYXRlVGltZSAgIEB1cGRhdGVkQXQKfQoKbW9kZWwgVHJhaW5lZSB7CiAgaWQgICAgICAgIFN0cmluZyAgICBAaWQgQGRlZmF1bHQodXVpZCgpKQogIHVzZXJJZCAgICBTdHJpbmcgICAgQHVuaXF1ZQogIGJpbyAgICAgICBTdHJpbmc_ICAgIAogIGFkZHJlc3MgICBTdHJpbmc_CiAgdXNlciAgICAgIFVzZXIgICAgICBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSkKICBib29raW5ncyAgQm9va2luZ1tdCiAgY3JlYXRlZEF0IERhdGVUaW1lICBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgIEB1cGRhdGVkQXQKfQoKbW9kZWwgU2NoZWR1bGUgewogIGlkICAgICAgICAgIFN0cmluZyAgICBAaWQgQGRlZmF1bHQodXVpZCgpKQogIHRpdGxlICAgICAgIFN0cmluZyAgICBAdW5pcXVlCiAgc3RhcnRUaW1lICAgRGF0ZVRpbWUKICBlbmRUaW1lICAgICBEYXRlVGltZQogIHRyYWluZXJJZCAgIFN0cmluZwogIG1heFRyYWluZWVzIEludCAgICAgICBAZGVmYXVsdCgxMCkKICB0cmFpbmVyICAgICBUcmFpbmVyICAgQHJlbGF0aW9uKGZpZWxkczogW3RyYWluZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgYm9va2luZ3MgICAgQm9va2luZ1tdCiAgY3JlYXRlZEF0ICAgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCAgIERhdGVUaW1lICBAdXBkYXRlZEF0Cn0KCm1vZGVsIEJvb2tpbmcgewogIGlkICAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KHV1aWQoKSkKICBzY2hlZHVsZUlkIFN0cmluZwogIHRyYWluZWVJZCAgU3RyaW5nCiAgc2NoZWR1bGUgICBTY2hlZHVsZSBAcmVsYXRpb24oZmllbGRzOiBbc2NoZWR1bGVJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgdHJhaW5lZSAgICBUcmFpbmVlICBAcmVsYXRpb24oZmllbGRzOiBbdHJhaW5lZUlkXSwgcmVmZXJlbmNlczogW2lkXSkKICBpc0NhbmNlbGxlZCBCb29sZWFuIEBkZWZhdWx0KGZhbHNlKQogIGNyZWF0ZWRBdCAgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpCiAgdXBkYXRlZEF0ICBEYXRlVGltZSBAdXBkYXRlZEF0Cn0KCmVudW0gUm9sZSB7CiAgQURNSU4KICBUUkFJTkVSCiAgVFJBSU5FRQp9Cg%3D%3D)

---

## Technology Stack
The project leverages the following technologies:
- **Backend**: TypeScript, Express.js, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JSON Web Token (JWT)
- **Validation**: Zod
- **Hosting**: [Your hosting platform, e.g., Vercel, AWS, etc.]

---

## API Endpoints
### Auth Routes
- `POST /api/auth/login`  
  **Request**: `{ email, password }`  
  **Response**: `{ token, user }`
- `POST /api/auth/register`  
  **Request**: `{ username, email, password, role }`  
  **Response**: `{ message }`

### User Routes
- `GET /api/users/:id`  
  **Response**: `{ user }`
- `PUT /api/users/:id`  
  **Request**: `{ username, email }`  
  **Response**: `{ updatedUser }`

### Trainer Routes
- `POST /api/trainers`  
  **Request**: `{ username, email, password, specialization }`  
  **Response**: `{ message }`

### Trainee Routes
- `POST /api/trainees`  
  **Request**: `{ username, email, password }`  
  **Response**: `{ message }`

### Schedule Routes
- `POST /api/schedules`  
  **Request**: `{ title, startTime, endTime, trainerId, maxTrainees }`  
  **Response**: `{ message }`

### Booking Routes
- `POST /api/bookings`  
  **Request**: `{ scheduleId, traineeId }`  
  **Response**: `{ message }`
- `PUT /api/bookings/:id/cancel`  
  **Response**: `{ message }`

---

## Database Schema



## API Endpoints  
 Here Is My Api Documentation: 

 https://documenter.getpostman.com/view/25533178/2sAYQcEqH1

## Admin Credentials  

  ## Live Hosting Link

  ### https://gymclass.hitchmi.com/api/v1

- **Username**: admin@example.com  
- **Password**: admin123  

## Instructions to Run Locally  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/yourusername/projectname.git  
   cd projectname  

2. **set Env Based On .env.example file**

  ```  pnpm i
       pnpm prisma generate dev
      pnpm prisma migrate dev
      pnpm dev
      
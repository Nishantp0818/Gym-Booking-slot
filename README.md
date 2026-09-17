# 🏋️ Gym Booking Slot

A full-stack **Gym Slot Booking System** built using the MERN stack.
The application allows members to explore gym classes, book available slots, manage bookings, while trainers and admins can manage classes and users.

## 🚀 Live Demo  : [Gym Booking Slot](https://gym-booking-slot-seven.vercel.app/)


<img width="2428" height="1430" alt="image" src="https://github.com/user-attachments/assets/92a7424c-db5b-419f-b919-48707f5dfcde" />


## 📌 Features

* 🔐 User Registration & Login
* 🍪 JWT Authentication using HTTP-only Cookies
* 👤 Role-based access: Member, Trainer & Admin
* 🏋️ Trainers can create, update and delete classes
* 📅 Class scheduling with date and time
* 🎟️ Slot capacity and availability management
* 📚 Members can book available classes
* 🚫 Prevents duplicate bookings
* 📋 Members can view their bookings
* ❌ Members can cancel bookings
* 👨‍💼 Admin can view and manage users
* 🔄 Admin can update member roles
* 📊 Admin can view all bookings
* 🔒 Protected routes based on user roles
* 📱 Responsive user interface

## 🛠️ Tech Stack

**Frontend**

* React.js
* React Router
* JavaScript
* HTML5
* CSS3

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
  

## 🏗️ Project Structure

```text
Gym-Booking-slot/
├── forntend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   
    └── server.js
```

## 🔑 User Roles

### Member

Members can browse classes, book slots, view their bookings and cancel bookings.

### Trainer

Trainers can create and manage gym classes, including class details, schedules and available slots.

### Admin

Admins can manage users, update user roles and view all bookings.

**Nishant Pandey**

Built as a full-stack MERN project to practice authentication, role-based authorization, REST APIs, database management and real-world booking workflows.



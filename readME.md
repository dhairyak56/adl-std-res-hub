# Adelaide Student Resource Hub

A comprehensive web platform designed to help University of Adelaide students find resources, connect with study groups, and access academic support services.

## Project Overview

This full-stack web application serves as a centralized hub for University of Adelaide students to:
- Discover and share academic resources
- Find and join study groups based on courses
- Schedule and manage study sessions
- Access real-time chat with peers
- Connect with academic support services

## Features

### User Authentication
- Secure sign-up and login system
- Profile management
- Role-based access (students, tutors, administrators)

### Resource Repository
- Upload and categorize study materials
- Search functionality with filters
- Rating and review system for resources
- Bookmarking capability

### Study Group Management
- Create and join study groups by course
- Schedule study sessions with calendar integration
- Track group progress and activities
- Find study groups based on location (on-campus or virtual)

### Real-time Communication
- Chat functionality for study groups
- Direct messaging between users
- Notifications for new messages and updates

### Academic Support
- Connect with tutors and academic advisors
- Book consultation sessions
- Access FAQ and help resources

## Technical Stack

### Frontend
- React.js with TypeScript
- Redux for state management
- Material UI for component library
- Responsive design for mobile compatibility

### Backend
- Node.js with Express
- RESTful API architecture
- Socket.io for real-time features

### Database
- MongoDB for flexible document storage
- Mongoose for ODM

### Authentication
- JWT (JSON Web Tokens)
- Password hashing with bcrypt

### Deployment
- Docker for containerization
- CI/CD pipeline with GitHub Actions
- Deployed on AWS or Heroku

## Project Structure

```
adelaide-student-hub/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context for state
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service calls
│   │   ├── utils/          # Helper functions
│   │   ├── App.tsx         # Main App component
│   │   └── index.tsx       # Entry point
│   ├── package.json
│   └── tsconfig.json
├── server/                 # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Helper functions
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   └── package.json
├── .gitignore
├── docker-compose.yml
├── README.md
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation and Setup
1. Clone the repository
   ```
   git clone https://github.com/yourusername/adelaide-student-hub.git
   cd adelaide-student-hub
   ```

2. Install dependencies
   ```
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/adelaide-student-hub
     JWT_SECRET=your_jwt_secret
     ```

4. Start development servers
   ```
   # Start both client and server in development mode
   cd ..
   npm run dev
   ```

5. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Development Roadmap

### Phase 1: Foundation
- Set up project structure and repositories
- Implement basic authentication
- Create database schema
- Build essential UI components

### Phase 2: Core Features
- Develop resource repository functionality
- Implement study group creation and management
- Build calendar integration
- Set up basic user profiles

### Phase 3: Advanced Features
- Add real-time chat capabilities
- Implement search and filtering
- Build notification system
- Enhance user profiles

### Phase 4: Refinement and Deployment
- Optimize performance
- Add analytics
- Improve UI/UX
- Deploy to production

## Contributing

This project is open for contributions. Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request


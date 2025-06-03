# SmartList 📝

A modern web application for creating public lists and collecting entries from users with shareable links. Perfect for attendance tracking, sign-ups, and data collection.

## 🚀 Features

- **Easy List Creation**: Create public lists with just a title and description
- **Real-time Collaboration**: Share list URLs and collect entries instantly
- **Duplicate Prevention**: Automatic detection of duplicate roll numbers
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Live Updates**: Real-time entry display and refresh functionality

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Spring Boot 3.5**
- **MongoDB** with Spring Data
- **Maven** for dependency management
- **Java 17**

## 📋 Prerequisites

- Node.js 16+ and npm
- Java 17+
- MongoDB Atlas account (or local MongoDB)
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smartlist.git
cd smartlist
```

### 2. Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
SmartList/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/backend/SmartList/
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Data models
│   │       ├── repository/  # MongoDB repositories
│   │       └── config/      # Configuration classes
│   └── pom.xml             # Maven dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   ├── package.json        # npm dependencies
│   └── vite.config.js      # Vite configuration
└── README.md
```

## 🔧 Configuration

### MongoDB Connection

Update the MongoDB connection string in `backend/src/main/resources/application.properties`:

```properties
spring.data.mongodb.uri=your-mongodb-connection-string
```

### CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative React dev server)

## 📡 API Endpoints

- `POST /api/lists` - Create a new list
- `GET /api/lists/{id}` - Get list details
- `POST /api/lists/{id}/entries` - Submit an entry
- `GET /api/lists/{id}/entries` - Get all entries for a list

## 🎨 Features in Detail

### List Creation
- Simple form with title and optional description
- Generates unique shareable links
- Instant redirect to list page

### Entry Submission
- Name and roll number validation
- Duplicate prevention
- Real-time success feedback

### List Management
- View all submitted entries
- Search functionality
- Copy shareable links
- Real-time refresh

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or any cloud platform supporting Java
- Configure MongoDB Atlas connection
- Set environment variables for production

### Frontend Deployment
- Deploy to Vercel, Netlify, or similar platforms
- Update API base URL for production backend
- Configure build scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Built with React and Spring Boot
- Styled with Tailwind CSS
- Icons from Lucide React
- Animations powered by Framer Motion

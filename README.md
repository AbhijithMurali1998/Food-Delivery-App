 FoodMarket – Online Food Delivery App
 FoodMarket – Online Food Delivery App
 [Frontend: React] [Backend: Node.js] [API: Express] [Database: MongoDB] [License: MIT] [Status:
 Active]
 FoodMarket is a full-stack online food delivery web application that allows users to browse
 restaurants, view menus, and order food online.
 Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for seamless performance and
 scalability.-----------------------------------------------------------
 Features- Browse restaurants and menus- Add items to cart and order instantly- Secure user authentication (Login / Register)- Real-time cart and order management- Admin panel to manage products and orders- MongoDB for data persistence and scalability-----------------------------------------------------------
 Project Structure
 FoodMarket
  Backend/ # Node.js + Express API server
   server.js # Entry point
   routes/ # API routes
   models/ # MongoDB models
   controllers/ # Business logic
   config/ # Database configuration
  Foodmarket/ # React frontend
   src/
    components/ # Reusable UI components
    pages/ # Page-level components
    App.js # Main React app
  README.md-----------------------------------------------------------
 Tech Stack
 Frontend: React.js, CSS
 Backend: Node.js, Express.js
 Database: MongoDB
 Other Tools: REST API, Axios, JSON, JWT-----------------------------------------------------------
 Installation & Setup
 1 Clone the Repository
 git clone https://github.com//FoodMarket.git
 cd FoodMarket
2
 Setup the Backend
 cd Backend
 npm install
 npm start
 (Backend runs on http://localhost:5000)
 3
 Setup the Frontend
 cd ../Foodmarket
 npm install
 npm start
 (Frontend runs on http://localhost:3000)-----------------------------------------------------------
 Environment Variables
 Create a .env file inside the Backend folder with:
 MONGO_URI=
 PORT=5000
 JWT_SECRET=-----------------------------------------------------------
 How It Works
 1. Frontend (React) – Handles user interface and API calls
 2. Backend (Node + Express) – Handles routes, logic, and data processing
 3. Database (MongoDB) – Stores users, menu items, and orders-----------------------------------------------------------
 Screenshots
 (Add screenshots or demo images here - Home page, Menu, Cart, Orders, etc.)-----------------------------------------------------------
 Deployment
 Frontend: Vercel / Netlify
 Backend: Render / Railway / Heroku
 Database: MongoDB Atlas-----------------------------------------------------------
 Author
 Abhijith Murali
 GitHub: https://github.com/
 Project developed under the NextGen Employability Program (KASE) under EY-----------------------------------------------------------
 License
 This project is licensed under the MIT License.
 You are free to use, modify, and distribute it with attribution.-----------------------------------------------------------
 FoodMarket — Bringing your favorite meals closer, one click at a time.

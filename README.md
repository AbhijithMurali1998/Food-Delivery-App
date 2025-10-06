                                                                FoodMarket – Online Food Delivery App
 #  FoodMarket – Online Food Delivery App
 FoodMarket is a full-stack web application that allows users to browse restaurants, view menus,
 and order food online.
 
 It is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).--
##  Features-  User-friendly interface to explore restaurants and dishes-  Add items to cart and place orders in real time-  User authentication (Login / Register)-  Manage orders and cart items dynamically-  Admin features to manage products and orders-  MongoDB integration for secure and scalable data storage--

##  Project Structure
 FoodMarket
  Backend/ # Node.js + Express API server
   server.js # Main server file
   routes/ # API routes
   models/ # MongoDB models
   controllers/ # Business logic
   config/ # Database configuration
  Foodmarket/ # React frontend
   src/
    components/ # Reusable UI components
    pages/ # Page-level components
    App.js # Main React app
  README.md--
  
##  Tech Stack
 | Layer | Technology |
 |:------|:------------|
 | Frontend | React.js, CSS |
 | Backend | Node.js, Express.js |
 | Database | MongoDB |
 | Other | REST API, JSON, Axios |--
 
##  Installation & Setup
 ### 1 Clone the Repository
 git clone https://github.com//FoodMarket.git
 cd FoodMarket
 
### 2 Setup the Backend
 cd Backend
 npm install
 npm start
 Backend runs by default on http://localhost:5000
 
 ### 3 Setup the Frontend
 cd ../Foodmarket
 npm install
 npm start
 Frontend runs by default on http://localhost:3000--
 
## 
 Environment Variables
 Create a `.env` file inside the **Backend** folder with the following keys:
 MONGO_URI=
 PORT=5000
 JWT_SECRET=--
 
## 
 How It Works
 1. **Frontend (React)** – Handles UI and API communication
 2. **Backend (Express + Node)** – Manages routes, authentication, and data operations
 3. **Database (MongoDB)** – Stores user info, orders, and product data

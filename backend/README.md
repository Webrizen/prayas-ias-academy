### **Project Initialization**

### **1. Install Required Packages**
   ```bash
   npm install
   ```

### **2. Project Structure**
   Set up a basic project structure:
   ```
   prayas-ias-backend/
   ├── config/
   │   ├── db.js
   ├── controllers/
   │   ├── authController.js
   ├── middlewares/
   │   ├── authMiddleware.js
   ├── models/
   │   ├── User.js
   ├── routes/
   │   ├── authRoutes.js
   ├── utils/
   │   ├── emailService.js
   ├── .env
   ├── server.js
   ├── package.json
   └── README.md
   ```

### **3. Environment Variables**
   Create a `.env` file for environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

### **4. Run the Server**
   Add a script in `package.json`:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

   Run the server:
   ```bash
   npm run dev
   ```

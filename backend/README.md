# Getting Started with Backend

## Steps to Run the Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
   - The server will run at [http://localhost:8080/](http://localhost:8080/).

## Database Connection
- This project uses MongoDB databse.

### Installing MongoDB
- Install [MongoDB](https://www.mongodb.com/docs/manual/installation/#mongodb-installation-tutorials) by following instructions.

### Script to Generate the Database
- To update the database schema while preserving existing data:
  ```sh
  node backend/scripts/initMongoDB.js
  ```
- To drop and recreate the database (erasing all data):
  ```sh
  node backend/scripts/initMongoDB.js --erase
  ```

### Viewing the Database
- Download [MongoDB Compass](https://www.mongodb.com/try/download/compass) to explore the database visually.
  - Make sure mongodb is running before opening Compass.
  - Connect to the database by going to `Connection` -> `Connect` and entering `mongodb://localhost:27017/expense_tracker` as the URL. 
  - Your database should now be visible in Compass.

## API Endpoints
- API endpoints are defined in the `routes` directory.
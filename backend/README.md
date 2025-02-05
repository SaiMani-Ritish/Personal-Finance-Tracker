# Getting Started with Backend

## Steps to Run the Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
   - The server will run at [http://localhost:8080/](http://localhost:8080/).

## Database Connection
- This project uses SQLite, allowing the database file to be included in the repository and shared across team members.

### Script to Generate the Database
- To update the database schema while preserving existing data:
  ```sh
  node backend/scripts/initDB.js
  ```
- To drop and recreate the database (erasing all data):
  ```sh
  node backend/scripts/initDB.js --erase
  ```

### Viewing the Database
- Use [DB Browser for SQLite](https://sqlitebrowser.org/dl/) to explore the database visually.


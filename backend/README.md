# Getting Started 

## Setup for AI Model Usage
#### Run Ollama Server 
- Open New Terminal
- `curl -fsSL https://ollama.com/install.sh | sh`
- `ollama serve`

#### Pull and Chat with a Large Language Model (LLM) Conversational AI
- Open New Terminal
- `ollama pull gemma2:2b`

## Steps to Run the Backend
- Open new terminal.
- Navigate to the backend directory: `cd backend`
- Install dependencies: `npm install`
- Start the server: `npm start`
   - The server will run at [http://localhost:8080/](http://localhost:8080/).


## Database Connection
- This project uses the MongoDB database.
### Installing MongoDB
- Install [MongoDB](https://www.mongodb.com/docs/manual/installation/#mongodb-installation-tutorials) by following instructions.
- Start MongoDB: `brew services start mongodb-community`
- Stop MongoDB: `brew services stop mongodb-community`

### Generate the Database
- Create index on expenses collection with following configuration. (Required for AI Chat)
    ```
    amount_text_category_text_date_text: {
        amount: 'text',
        category: 'text',
        date: 'text',
    }
    ```
- Create index on income collection with following configuration. (Required for AI Chat)
   ```
    amount_text_source_text_date_text: {
        amount: 'text',
        source: 'text',
        date: 'text',
    }
   ```
- Script To update the database schema while preserving existing data:
  ```sh
  node backend/scripts/initMongoDB.js
  ```
- Script To drop and recreate the database (erasing all data):
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

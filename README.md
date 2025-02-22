# TP-CS628_Team3_Personal Finance Tracker

Overview
The Personal Finance Tracker is a MERN stack web application designed to help users track their financial transactions, manage expenses, and plan their budgets effectively. The app provides an interactive dashboard with categorized expenses, income tracking, savings distribution, and AI-powered financial insights.

Key Features
Dashboard:

Displays financial overviews, including income trends and categorized expenses.
Interactive charts for better visualization of spending and savings.
AI-powered chatbot for financial queries and insights.
Expense Manager:

Allows users to log expenses with details like name, category, amount, and date.
Edit and delete expenses to keep records updated.
Filters for sorting expenses based on date, category, and amount.
Budget Planner:

Enables users to set monthly budgets for different spending categories.
Tracks budget consumption and alerts users when they exceed limits.
Helps users manage and adjust savings strategies.
Generative AI Integration:

AI-powered chatbot for personalized finance recommendations.
Analyzes user spending patterns to provide insights and budget suggestions.
Technology Stack
Frontend: React, React Router, JSX, Bootstrap for UI
Backend: Node.js, Express.js
Database: MongoDB (Mongoose for schema modeling)
State Management: React Context API / Hooks
Authentication: (To be added in future versions)
Version Control: GitHub
Installation & Setup
Clone the repository:
sh
Copy
Edit
git clone https://github.com/your-team-repo/finance-tracker.git
cd finance-tracker
Install dependencies:
sh
Copy
Edit
npm install
Start the backend server:
sh
Copy
Edit
cd backend  
node server.js  
Start the frontend:
sh
Copy
Edit
cd frontend  
npm start  
Open http://localhost:3000/ in your browser to access the application.
API Endpoints
Method	Endpoint	Description
GET	/api/expenses	Fetch all expenses
POST	/api/expenses	Add a new expense
PUT	/api/expenses/:id	Edit an expense
DELETE	/api/expenses/:id	Delete an expense
GET	/api/budgets	Fetch all budgets
POST	/api/budgets	Create a budget
PUT	/api/budgets/:id	Update a budget
DELETE	/api/budgets/:id	Remove a budget
GET	/api/ai/analyze	AI-generated financial insights
Lessons Learned
Improved understanding of the MERN stack and full-stack development.
Learned how to integrate generative AI into web applications.
Gained hands-on experience in project collaboration using GitHub.
Improved UI design and state management in React.
Contributors
Vidhi – Expense Manager Feature
Ritish – Budget Planner Feature
Sangetha – Dashboard Feature
MEETINGS.md
Team Meetings Log
Meeting Schedule
Meeting Platform: Microsoft Teams
Meeting Frequency: Every Wednesday
Meeting Dates: January 29, 2025 – February 19, 2025
Meeting Summaries
Meeting 1 - January 29, 2025
Agenda:

Discussed project scope and division of features.
Finalized workload assignments:
Vidhi: Expense Manager
Ritish: Budget Planner
Sangetha: Dashboard
Set up the GitHub repository and project workflow.
Action Items:

All members set up their development environments.
Initial project structure created.

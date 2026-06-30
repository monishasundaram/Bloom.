🌸 Bloom – Personal Expense Tracker

A modern personal expense tracker built with a clean Neomorphism UI to help users manage their finances with ease.

📖 About the Project

Bloom is a web-based Personal Expense Tracker designed to help users record, organize, and analyze their daily income and expenses. It provides an intuitive dashboard with visual reports, transaction history, and budgeting features, making personal finance management simple and efficient.

The application follows a Neomorphism design theme, creating a soft, elegant, and minimal user interface that enhances the user experience.

✨ Features
🔐 User Authentication (Sign Up & Login)
🏠 Interactive Dashboard
💰 Add Income and Expenses
📊 Expense Analytics (Bar & Pie Charts)
📅 Transaction History
🔍 Search and Filter Transactions
🗂 Expense Categories
💵 Budget Planning
📱 Fully Responsive Design
🎨 Neomorphism UI Design
🎨 Design Theme

Bloom uses the Neomorphism (Soft UI) design style, featuring:

Soft shadows
Rounded components
Minimalistic layout
Smooth hover animations
Elegant color palette
Clean typography
Modern user experience

🛠️ Tech Stack
Frontend
HTML5
CSS3
JavaScript (ES6)
Backend
Spring Boot (Java)
Database
MySQL
Tools
Git
GitHub
VS Code
Postman

bloom-tracker/
│
├── index.html                  # Landing page (redirects to dashboard if logged in)
│
├── css/
│   └── neo.css                 # Global neomorphism design system
│                                #   - CSS variables (light/dark theme tokens)
│                                #   - Buttons, forms, cards, tables, modals, toasts
│                                #   - Sidebar/topbar layout, grid utilities, responsive rules
│
├── js/
│   ├── core.js                  # Shared logic, loaded on every page
│   │     ThemeManager   — light/dark toggle + persistence
│   │     DB             — localStorage wrapper (get/set/remove)
│   │     Auth           — login/signup/logout/session + demo data seeding
│   │     TxManager      — transaction CRUD + summaries
│   │     BudgetManager  — budget CRUD + spending calculations
│   │     GoalManager    — savings goal CRUD
│   │     CatManager     — category CRUD
│   │     Notify         — toast UI + persisted notification log
│   │     Fmt            — currency/date formatters
│   │     buildNav() / buildTopbar() — shared sidebar + header injected per page
│   │
│   └── charts.js                # Chart.js wrapper functions
│         makePieChart / makeBarChart / makeLineChart / makeHorizontalBar
│         ChartTheme — reads CSS variables so charts match light/dark theme
│
└── pages/
    ├── login.html               # Sign in (validation, session creation)
    ├── signup.html               # Create account (password strength, seeds demo data)
    │
    ├── dashboard.html             # Overview: stat widgets, pie + bar charts, recent tx, budget snapshot
    ├── transactions.html          # Full CRUD: search, filter, sort, pagination
    ├── budgets.html                # Per-category limits, progress bars, CRUD
    ├── goals.html                  # Savings goals, contribution flow, progress rings
    ├── statistics.html             # Multi-chart analytics with 3M/6M/1Y range toggle
    ├── reports.html                  # Generate/print monthly, category, or custom-range reports
    ├── categories.html               # Manage expense/income categories (icon + color picker)
    ├── notifications.html             # Budget alert feed + notification preferences
    └── settings.html                  # Profile, theme, currency, data export, clear data

🚀 How to Run
Frontend
Clone the repository
git clone https://github.com/yourusername/Bloom.git
Open the project folder.
Open index.html in your browser.
Backend (Spring Boot)
Open the backend project in your IDE.
Configure MySQL database credentials.
Run the Spring Boot application.
Access the API locally.

📊 Modules
Authentication
Dashboard
Income Management
Expense Management
Transaction History
Budget Management
Reports & Analytics
User Profile

🎯 Future Enhancements
Export reports as PDF/Excel
Dark Mode
Recurring Transactions
AI-powered Spending Insights
Email Notifications
Multi-Currency Support
Cloud Backup

👩‍💻 Author
Monisha

📄 License
Free to use, modify, and extend for personal or educational purposes.


📜 License
This project is developed for educational and learning purposes. Feel free to use and modify it for personal or academic projects.

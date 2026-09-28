<h1 align="center">🌸 Bloom</h1>

<h3 align="center">A soft, modern personal expense tracker</h3>

<p align="center">
Track income and expenses, set budgets, reach savings goals, and understand where your money goes, all in a calm Neomorphism interface.
</p>

<p align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white" alt="Chart.js">
<img src="https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot">
<img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL">
<img src="https://img.shields.io/badge/license-Educational-blue" alt="License">
</p>


---

## 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Design](#-design)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Modules](#-modules)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 📖 About

**Bloom** is a web-based personal expense tracker that helps you record, organize, and analyze your daily income and expenses. It brings together an interactive dashboard, visual reports, searchable transaction history, and budget planning in one simple, elegant app.

The interface follows a **Neomorphism (Soft UI)** style: gentle shadows, rounded components, and a minimal layout that keeps personal finance feeling approachable rather than overwhelming.

## ✨ Features

| Area | What you get |
|------|--------------|
| 🔐 **Authentication** | Sign up and log in, with password-strength feedback and session handling |
| 🏠 **Dashboard** | Stat widgets, pie and bar charts, recent transactions, and a budget snapshot |
| 💰 **Transactions** | Add, edit, and delete income and expenses, with search, filters, sorting, and pagination |
| 🗂 **Categories** | Custom expense and income categories with icon and color pickers |
| 💵 **Budgets** | Per-category spending limits with live progress bars |
| 🎯 **Savings Goals** | Track goals, add contributions, and watch progress rings fill up |
| 📊 **Analytics** | Multi-chart statistics with 3M / 6M / 1Y range toggle |
| 📄 **Reports** | Generate and print monthly, category, or custom-range reports |
| 🔔 **Notifications** | Budget alerts and configurable notification preferences |
| ⚙️ **Settings** | Profile, theme (light/dark), currency, data export, and clear-data options |
| 📱 **Responsive** | Works across desktop, tablet, and mobile |

## 🎨 Design

Bloom's design system lives in a single stylesheet (`css/neo.css`) built on CSS variables, so light and dark themes share the same components.

- Soft, layered shadows for the raised and inset effect
- Rounded buttons, cards, forms, tables, modals, and toasts
- Smooth hover and press animations
- Light and dark theme tokens
- Charts that read the same CSS variables, so they always match the active theme

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6), Chart.js |
| **Backend** | Spring Boot (Java) |
| **Database** | MySQL |
| **Tools** | Git, GitHub, VS Code, Postman |

> **Note:** The frontend currently persists data in the browser's `localStorage`, so it runs standalone with no server. The Spring Boot + MySQL backend provides the API layer for persistent, multi-device storage.

## 📁 Project Structure

```
bloom-tracker/
├── index.html              # Landing page (redirects to dashboard if logged in)
│
├── css/
│   └── neo.css             # Global neomorphism design system
│                           #   CSS variables, components, layout, responsive rules
│
├── js/
│   ├── core.js             # Shared logic, loaded on every page
│   │                       #   ThemeManager, DB, Auth, TxManager, BudgetManager,
│   │                       #   GoalManager, CatManager, Notify, Fmt,
│   │                       #   buildNav() / buildTopbar()
│   └── charts.js           # Chart.js wrappers + theme-aware ChartTheme
│                           #   makePieChart / makeBarChart / makeLineChart /
│                           #   makeHorizontalBar
│
└── pages/
    ├── login.html          # Sign in
    ├── signup.html         # Create account (seeds demo data)
    ├── dashboard.html      # Overview: widgets, charts, recent activity
    ├── transactions.html   # Full CRUD, search, filter, sort, pagination
    ├── budgets.html        # Per-category limits and progress
    ├── goals.html          # Savings goals and contributions
    ├── statistics.html     # Multi-chart analytics with range toggle
    ├── reports.html        # Printable reports
    ├── categories.html     # Category management
    ├── notifications.html  # Alerts and preferences
    └── settings.html       # Profile, theme, currency, data tools
```

### Core modules at a glance

| Module | Responsibility |
|--------|----------------|
| `ThemeManager` | Light/dark toggle with persistence |
| `DB` | `localStorage` wrapper (get / set / remove) |
| `Auth` | Login, signup, logout, sessions, demo data seeding |
| `TxManager` | Transaction CRUD and summaries |
| `BudgetManager` | Budget CRUD and spending calculations |
| `GoalManager` | Savings goal CRUD |
| `CatManager` | Category CRUD |
| `Notify` | Toast UI and persisted notification log |
| `Fmt` | Currency and date formatters |

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- *(Backend only)* Java 17+, Maven, and MySQL 8+

### Frontend

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/Bloom.git

# 2. Move into the project folder
cd Bloom

# 3. Open index.html in your browser
```

For the smoothest experience, serve it locally instead of opening the file directly:

```bash
npx serve .
# or
python -m http.server 8000
```

Sign up for a new account and Bloom will seed demo data so you can explore right away.

### Backend (Spring Boot)

1. Open the backend project in your IDE.
2. Create a MySQL database (for example, `bloom_db`).
3. Update your credentials in `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bloom_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

4. Run the application:

   ```bash
   ./mvnw spring-boot:run
   ```

5. The API will be available at `http://localhost:8080`.

## 📦 Modules

- **Authentication**: sign up, login, sessions
- **Dashboard**: at-a-glance financial overview
- **Income Management**: record and categorize income
- **Expense Management**: record and categorize spending
- **Transaction History**: search, filter, and sort everything
- **Budget Management**: limits, progress, and alerts
- **Reports & Analytics**: charts and printable reports
- **User Profile**: account, theme, and currency preferences

## 🎯 Roadmap

- [x] Light / dark theme
- [x] Savings goals
- [x] Data export from settings
- [ ] Export reports as PDF / Excel
- [ ] Recurring transactions
- [ ] AI-powered spending insights
- [ ] Email notifications
- [ ] Full multi-currency support
- [ ] Cloud backup and sync

## 🤝 Contributing

Contributions, issues, and feature ideas are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 👩‍💻 Author

**Monisha**

## 📄 License

This project is developed for educational and learning purposes. You're free to use, modify, and extend it for personal or academic projects.

---

<p align="center">Made with 🌸 by Monisha</p>

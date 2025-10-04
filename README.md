# 💼 Expense Management System

**A Modern, Role-Based Expense Reimbursement Solution**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)

[📺 Watch Demo](https://drive.google.com/file/d/1JrhYekozNYeIEo7hdfeEXcVc4D3kLGs-/view?usp=drivesdk) • [🐛 Report Bug](https://github.com/ArmanAmreliya/Tech-Titans-EM/issues) • [✨ Request Feature](https://github.com/ArmanAmreliya/Tech-Titans-EM/issues)

</div>

---

## 📖 About The Project

Built for the **Odoo x Amalthea, IIT GN Hackathon 2025**, this expense management system revolutionizes how organizations handle expense reimbursements. Say goodbye to manual, time-consuming processes and embrace a transparent, efficient, role-based digital solution.

### 🎯 Problem Statement

Traditional expense management suffers from:
- ⏰ **Time-consuming manual processes** that delay reimbursements
- 📄 **Paper-based workflows** prone to loss and errors
- 🔍 **Lack of transparency** in approval status
- 💱 **Currency confusion** in multi-currency environments
- 🤷 **Unclear approval hierarchies** causing bottlenecks

### 💡 Our Solution

A comprehensive digital platform that streamlines the entire expense lifecycle with:
- ✅ Automated approval workflows
- 🔄 Real-time status tracking
- 💰 Multi-currency support with automatic conversion
- 🤖 OCR-powered receipt scanning
- 👥 Role-based access control

---

## ✨ Key Features

### 👔 **Admin Dashboard**

<details open>
<summary><b>Complete System Control</b></summary>

- 👥 **User Management**: Create, edit, and assign roles (Admin/Manager/Employee)
- 🔄 **Workflow Builder**: Design custom multi-level approval sequences
  - Example: Employee → Manager → Finance → CFO
- ⚙️ **Conditional Rules**: Configure advanced approval logic
  - Percentage-based thresholds (e.g., >$500 needs CFO approval)
  - Category-specific approvers
  - Department-based routing
- 📊 **Global Analytics**: Company-wide expense insights and reports
- 🔐 **Override Authority**: Final approval/rejection power when needed

</details>

### 👨‍💼 **Manager Portal**

<details>
<summary><b>Efficient Team Management</b></summary>

- 📋 **Approval Queue**: Centralized view of pending expense claims
- 💱 **Smart Currency Display**: Auto-convert to company default currency
- ✅ **Quick Actions**: One-click approve/reject with comment support
- 📈 **Team Analytics**: Monitor team spending patterns and history
- 🔔 **Priority Flagging**: Identify urgent or high-value claims

</details>

### 👨‍💻 **Employee Interface**

<details>
<summary><b>Seamless Expense Submission</b></summary>

- 📸 **OCR Receipt Scanning**: Upload receipt → Auto-extract details
- 💰 **Multi-Currency Support**: Submit in any currency you spent
- 📝 **Detailed Forms**: Category, amount, date, description, attachments
- 🔍 **Live Tracking**: Real-time approval status updates
- 📊 **Personal History**: Complete submission and reimbursement log
- 📱 **Mobile-Optimized**: Submit expenses on-the-go

</details>

### 🌟 **Universal Features**

- 🌓 **Theme Support**: Elegant light/dark mode toggle
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile
- 🔒 **Secure Authentication**: Role-based access control
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS

---

## 🛠️ Technology Stack

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
      <br>React
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
      <br>Vite
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
      <br>Tailwind CSS
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=javascript" width="48" height="48" alt="JavaScript" />
      <br>JavaScript
    </td>
  </tr>
</table>

**Core Technologies:**
- **Frontend Framework**: React 18.2.0 with Hooks
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router v6
- **State Management**: Zustand / Context API
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **OCR**: Tesseract.js
- **Currency API**: Exchange Rate API

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArmanAmreliya/Tech-Titans-EM.git
   cd Tech-Titans-EM
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist/` directory.
---

## 🎯 Project Structure

```
Tech-Titans-EM/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── contexts/        # Context API providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js
```

---

## 👥 Team Tech Titans

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/ArmanAmreliya.png" width="100px;" alt="Arman Amreliya"/><br />
      <sub><b>Arman Amreliya</b></sub><br />
      <a href="https://github.com/ArmanAmreliya">💻</a>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Drashti Mistry"/><br />
      <sub><b>Drashti Mistry</b></sub><br />
      💻
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Jay Chhatrotiya"/><br />
      <sub><b>Jay Chhatrotiya</b></sub><br />
      💻
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Krish Vaghela"/><br />
      <sub><b>Krish Vaghela</b></sub><br />
      💻
    </td>
  </tr>
</table>

---

## 🏆 Hackathon Information

- **Event**: Odoo x Amalthea, IIT GN Hackathon 2025
- **Team Name**: Tech Titans
- **Category**: Expense Management Solutions
- **Reviewer**: [To Be Assigned]

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

**Team Tech Titans** - [GitHub Organization](https://github.com/ArmanAmreliya/Tech-Titans-EM)

**Project Link**: [https://github.com/ArmanAmreliya/Tech-Titans-EM](https://github.com/ArmanAmreliya/Tech-Titans-EM)

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

Made with ❤️ by Team Tech Titans for Odoo x Amalthea Hackathon 2025

</div>

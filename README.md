# 📚 Flash.ly — Flashcard Generator Web App

Flash.ly is a modern, responsive flashcard generator built using **React** and **Vite**. It allows users to create, manage, study, and export flashcards in a simple and intuitive way. The app is designed to make learning more efficient by bringing traditional flashcards into a digital, shareable format.

🔗 **Live Demo:** https://flashly-beta.vercel.app  
📦 **GitHub Repo:** https://github.com/rameez-sidd/Flash.ly

---
## ✨ Features

- 📝 Create flashcard groups with title, description, and cover image
- 📖 Add multiple terms with definitions and optional images
- 🔄 Flip and navigate through flashcards while studying
- 💾 Persistent storage using Redux Persist (data saved in browser)
- 📤 Export flashcards as printable PDFs
- 🔗 Share flashcards across social platforms
- 📱 Fully responsive design for mobile and desktop

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite
- **State Management:** Redux Toolkit, Redux Persist
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **PDF Export:** jsPDF
- **Utilities:** UUID, Base64 image handling
- **Deployment:** Vercel

---

## 📂 Project Structure

```txt
Flash.ly/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages (Create, View, Study)
│   ├── redux/          # Redux slices and store configuration
│   ├── assets/         # Images and static assets
│   ├── utils/          # Helper functions
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
└── package.json
```
---

## 🚀 Getting Started

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/rameez-sidd/Flash.ly.git

# Navigate into the project directory
cd Flash.ly

# Install dependencies
npm install

# Start the development server
npm run dev
```
---

## 🧠 How It Works

- Flashcards are grouped and stored using Redux slices.
- Data persists across sessions using local storage via Redux Persist.
- Images are validated (≤250KB) and stored in Base64 format.
- Each flashcard group is assigned a unique UUID.
- Users can export flashcards as PDFs or share them via supported platforms.

---

## 🎯 Purpose

This project was built as a capstone project to demonstrate practical skills in modern frontend development, including component-based architecture, state management, routing, and third-party library integration. It focuses on solving a real learning problem through a clean and user-friendly interface.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👤 Author

Rameez Siddiqui
GitHub: [@rameez-sidd](https://github.com/rameez-sidd/)
LinkedIn: [@rameez-siddiqui](https://www.linkedin.com/in/rameez-siddiqui/)




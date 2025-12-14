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


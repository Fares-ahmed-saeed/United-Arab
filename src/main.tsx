
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Setup dark mode on initial load
const root = document.documentElement;
const darkModePreference = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (darkModePreference === "dark" || (!darkModePreference && prefersDark)) {
  root.classList.add("dark");
} else {
  root.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(<App />);

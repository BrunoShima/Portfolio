import { Routes, Route, useLocation } from "react-router";

import HomeScreen from "./screens/home/HomeScreen";
import AboutScreen from "./screens/about/AboutScreen";
import ContactScreen from "./screens/contact/ContactScreen";
import ProjectsScreen from "./screens/projects/ProjectsScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="/projects" element={<ProjectsScreen />} />
    </Routes>
  );
}
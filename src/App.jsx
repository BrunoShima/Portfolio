import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";

import Header from "./components/ui/Header";

import HomeScreen from "./screens/home/HomeScreen";
import AboutScreen from "./screens/about/AboutScreen";
import ContactScreen from "./screens/contact/ContactScreen";
import ProjectDetailScreen from "./screens/projects/ProjectDetailScreen";
import ProjectListScreen from "./screens/projects/ProjectListScreen";

import NotFoundScreen from "./screens/extra/NotFoundScreen";



export default function App() {

  const location = useLocation();

  return (
    <>
      <Header/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} />

          <Route path="/projects/" element={<ProjectListScreen />} />
          <Route path="/projects/:label" element={<ProjectListScreen />} />
          <Route path="/projects/:label/:projectId" element={<ProjectDetailScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
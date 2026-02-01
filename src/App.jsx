import { Routes, Route } from "react-router";
import HomeScreen from "./screens/home/homescreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
    </Routes>
  );
}
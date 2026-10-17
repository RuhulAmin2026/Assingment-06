import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FitLogProvider } from "./context/FitLogContext";
import WorkoutsPage from "./pages/WorkoutsPage";
import MyPlanPage from "./pages/MyPlanPage";

export default function App() {
  return (
    <FitLogProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<WorkoutsPage />} />
          <Route path="/my-plan" element={<MyPlanPage />} />
          <Route path="*" element={<WorkoutsPage />} />
        </Routes>
        <Footer />
      </div>
    </FitLogProvider>
  );
}
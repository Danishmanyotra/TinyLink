import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import Header from "./components/Header.jsx";
import Healthcheck from "./pages/Healthcheck.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#fff", border: "1px solid #ddd" },
        }}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<StatsPage />} />
          <Route path="/healthz" element={<Healthcheck />} />
        </Routes>
      </main>
    </div>
  );
}

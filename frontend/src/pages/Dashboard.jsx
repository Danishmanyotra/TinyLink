import { useEffect, useState } from "react";
import api from "../services/api";

import LinkForm from "../components/LinkForm";
import LinkTable from "../components/LinkTable";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/links");
      setLinks(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchLinks();
  }, []);

 
  const handleDelete = async (code) => {
    const yes = confirm(`Delete short link "${code}"?`);
    if (!yes) return;

    try {
      await api.delete(`/api/links/${code}`);
      const newList = links.filter((l) => l.code !== code);
      setLinks(newList);
      setFiltered(newList);
    } catch (err) {
      alert("Delete failed. Try again.");
    }
  };


  useEffect(() => {
    const q = search.toLowerCase();
    const result = links.filter(
      (l) =>
        l.code.toLowerCase().includes(q) ||
        l.originalUrl.toLowerCase().includes(q)
    );
    setFiltered(result);
  }, [search, links]);

 
  const handleCreated = () => {
    fetchLinks();
  };

  return (
    <div>
      
      <h1 className="text-2xl font-semibold mb-6 tracking-tight">Dashboard</h1>

      
      <LinkForm onCreated={handleCreated} />

      
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg 
  focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <span className="text-sm text-gray-500">{filtered.length} links</span>
      </div>

      
      {loading && (
        <div className="text-center py-10 text-gray-600">Loading links...</div>
      )}

      
      {!loading && <LinkTable links={filtered} onDelete={handleDelete} />}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { copyToClipboard } from "../utils/copyToClipboard";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";

export default function StatsPage() {
  const { code } = useParams();

  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const shortUrl =
    (import.meta.env.VITE_BASE_URL || "http://localhost:4000") + "/" + code;

 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/links/${code}`);
        setLink(res.data);
        setError("");
      } catch (err) {
        setError("Link not found or deleted.");
        toast.error("Link not found or deleted.");
        setLink(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  
  const handleCopy = async () => {
    const ok = await copyToClipboard(shortUrl);
    if (ok) 
    toast.success("Copied to clipboard!");
  };

 
  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading stats...</div>;

  if (error)
    return (
      <div className="text-red-600 text-center py-10 font-medium">
        {error}
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Stats for: {code}
      </h1>

      <div className="bg-white shadow-sm border rounded p-6">
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Short URL</p>
          <div className="flex items-center gap-3 mt-1">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 font-medium break-all"
            >
              {shortUrl}
            </a>

            <button
              onClick={handleCopy}
              className="text-xs text-white px-2 py-1 border bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Copy
            </button>
          </div>
        </div>

        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Target URL</p>
          <p className="mt-1 break-all text-gray-800">
            {link.originalUrl}
          </p>
        </div>

        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Total Clicks</p>
          <p className="mt-1 text-gray-800">{link.clicks}</p>
        </div>

        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Last Clicked</p>
          <p className="mt-1 text-gray-800">{formatDate(link.lastClicked)}</p>
        </div>

       
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Created At</p>
          <p className="mt-1 text-gray-800">{formatDate(link.createdAt)}</p>
        </div>

       
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition text-sm shadow-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

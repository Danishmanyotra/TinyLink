import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function LinkForm({ onCreated }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // front-end URL validation (simple regex)
  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!url.trim()) {
      return setError("Please enter a URL.");
    }

    if (!isValidUrl(url)) {
      return setError("Invalid URL format.");
    }

    if (customCode && !/^[A-Za-z0-9]{6,8}$/.test(customCode)) {
      return setError("Custom code must be 6–8 alphanumeric characters.");
    }

    setLoading(true);
    try {
      const res = await api.post("/api/links", {
        originalUrl: url,
        customCode: customCode || undefined,
      });

      setSuccess(res.data.shortUrl);
      toast.success("Short link created!");

      setUrl("");
      setCustomCode("");

      if (onCreated) onCreated(res.data);
    } catch (err) {
     const msg=err.response?.data?.error || "Something went wrong";
     setError(msg);
     toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm p-6 rounded-xl mb-8 border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Create Short Link
      </h2>

      {/* Long URL Input */}
      <label className="block mb-3">
        <span className="text-sm font-medium text-gray-700">Long URL</span>
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>

      {/* Custom Code Input */}
      <label className="block mb-4">
        <span className="text-sm font-medium text-gray-700">
          Custom Code (optional)
        </span>
        <input
          type="text"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          placeholder="6–8 characters (e.g., docs123)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
      </label>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 mb-2 text-sm font-medium">{error}</p>
      )}

      {/* Success Message */}
      {success && (
        <p className="text-green-600 mb-2 text-sm font-medium">{success}</p>
      )}

      {/* Submit Button */}
      <button
        disabled={loading}
        className={`px-5 py-2.5 rounded-lg text-white font-medium shadow-sm transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Creating..." : "Create Link"}
      </button>
    </form>
  );
}

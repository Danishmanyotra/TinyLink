import { Link } from "react-router-dom";
import { copyToClipboard } from "../utils/copyToClipboard";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";

export default function LinkRow({ link, onDelete }) {
  const shortUrl =
    (import.meta.env.VITE_BASE_URL || "http://localhost:4000") +
    "/" +
    link.code;

  const handleCopy = async () => {
    const success = await copyToClipboard(shortUrl);
    if (success) {
      toast.success("Copied to clipboard!");
    }
  };

  
  return (
    <tr className="border-b text-sm hover:bg-gray-50 transition">
      {/* Code */}
      <td className="p-3 font-mono">{link.code}</td>

      {/* Target URL */}
      <td className="p-3 max-w-xs">
        <span className="truncate block">{link.originalUrl}</span>
      </td>

      {/* Clicks */}
      <td className="p-3">{link.clicks}</td>

      {/* Last Clicked */}
      <td className="p-3">{formatDate(link.lastClicked)}</td>

      {/* Actions */}
      <td className="p-3 space-x-2">
        {/* Stats Button */}
        <Link
          to={`/code/${link.code}`}
          className="px-2.5 py-1.5 text-xs bg-green-500 border text-white font-medium rounded-lg shadow-sm hover:bg-green-600 transition"
        >
          Stats
        </Link>

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="px-2.5 py-1.5 text-xs bg-yellow-500  text-white font-medium border shadow-sm rounded-lg hover:bg-yellow-600 transition"
        >
          Copy
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(link.code)}
          className="px-2.5 py-1.5  text-xs  border rounded-lg bg-red-500 text-white font-medium border-red-300 hover:bg-red-600 shadow-sm transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}


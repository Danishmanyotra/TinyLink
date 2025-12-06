import LinkRow from "./LinkRow";
import toast from "react-hot-toast";
export default function LinkTable({ links, onDelete }) {
  if (!links || links.length === 0) {
    return (
      <div className="text-gray-600 text-center py-8 bg-white border rounded-lg">
        No links created yet.
      </div>
    );
  }
  const onCopy = async (code) => {
  const text = `${import.meta.env.VITE_BASE_URL}/${code}`;
  await navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};
 
  return (
    <div className="bg-white border rounded-lg shadow-sm">

      {/* Desktop + Tablet View (Table Layout) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr className="text-left text-sm font-medium text-gray-700">
              <th className="p-3">Short Code</th>
              <th className="p-3">Target URL</th>
              <th className="p-3">Clicks</th>
              <th className="p-3">Last Clicked</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link) => (
              <LinkRow key={link.code} link={link} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Card Layout) */}
      <div className="md:hidden space-y-4 p-3">
        {links.map((link) => (
          <div
            key={link.code}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="mb-2">
              <p className="text-xs text-gray-700 font-bold">Short Code</p>
              <p className="font-mono text-blue-600">{link.code}</p>
            </div>

            <div className="mb-2">
              <p className="text-xs text-gray-700 font-bold">Target URL</p>
              <p className="text-sm text-blue-500 break-all">{link.originalUrl}</p>
            </div>

            <div className="mb-2 flex justify-between">
              <div>
                <p className="text-xs text-gray-700 font-bold">Clicks</p>
                <p className="font-semibold">{link.clicks}</p>
              </div>

              <div>
                <p className="text-xs text-gray-700 font-bold">Last Clicked</p>
                <p className="text-sm text-gray-700">
                  {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "-"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => onCopy(link.code)}
                className="px-3 py-1 text-xs border font-bold rounded-md text-white  bg-yellow-500 hover:bg-yellow-700"
              >
                Copy
              </button>

              <a
                href={`/code/${link.code}`}
                className="px-3 py-1 text-xs border rounded-md text-white font-bold bg-green-500 hover:bg-green-700"
              >
                Stats
              </a>

              <button
                onClick={() => onDelete(link.code)}
                className="px-3 py-1 text-xs border rounded-md text-white bg-red-500 font-bold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

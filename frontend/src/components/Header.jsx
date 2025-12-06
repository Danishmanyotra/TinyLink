import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800 tracking-tight">
          TinyLink
        </Link>

        <nav className='space-x-6'>
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Dashboard
          </Link>
          <Link to="/healthz" className="text-sm font-medium text-gray-600 hover:text-gray-900">
    Healthcheck
  </Link>
        </nav>
      </div>
    </header>
  );
}

import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Healthcheck() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedAt, setCheckedAt] = useState(null);
  const [responseTime, setResponseTime] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        setLoading(true);
        const start = performance.now();

        const res = await api.get("/healthz");

        const end = performance.now();
        setResponseTime((end - start).toFixed(1) + " ms");

        setStatus(res.data);
        setCheckedAt(new Date().toLocaleString());
      } catch (err) {
        setStatus({ ok: false, error: "Server unreachable" });
      } finally {
        setLoading(false);
      }
    }

    checkHealth();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        System Health Check
      </h1>

      <div className="bg-white shadow-sm border rounded p-6">
       
        {loading && (
          <p className="text-gray-600 text-center py-8">Checking system...</p>
        )}

       
        {!loading && (
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p
                className={`mt-1 text-lg font-semibold ${
                  status?.ok ? "text-green-600" : "text-red-600"
                }`}
              >
                {status?.ok ? "Healthy ✓" : "Unhealthy ✗"}
              </p>
            </div>

            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Version</p>
              <p className="mt-1 text-gray-800">
                {status?.version || "Unknown"}
              </p>
            </div>

            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Response Time</p>
              <p className="mt-1 text-gray-800">{responseTime}</p>
            </div>

            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600">Last Checked</p>
              <p className="mt-1 text-gray-800">{checkedAt}</p>
            </div>

            
            <div className="mt-6">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 text-sm"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

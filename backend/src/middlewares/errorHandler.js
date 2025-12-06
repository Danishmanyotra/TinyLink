export default function errorHandler(err, req, res, next) {
  console.error(err);

  
  if (err?.code === 11000) {
    return res.status(409).json({ error: "Duplicate key error" });
  }

  
  if (err?.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({ error: "Server error" });
}

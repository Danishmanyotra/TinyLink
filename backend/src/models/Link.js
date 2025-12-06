import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  originalUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.models.Link || mongoose.model("Link", LinkSchema);

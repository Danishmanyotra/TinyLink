import Link from "../models/Link.js";


export async function redirectHandler(req, res, next) {
  try {
    const { code } = req.params;

    
    const updated = await Link.findOneAndUpdate(
      { code },
      { $inc: { clicks: 1 }, $set: { lastClicked: new Date() } },
      { new: true } 
    ).lean();

    if (!updated) {
      return res.status(404).send("Not found");
    }

    
    return res.redirect(302, updated.originalUrl);
  } catch (err) {
    next(err);
  }
}

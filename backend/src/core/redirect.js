import Link from "../models/Link.js";

/**
 * Redirect handler for GET /:code
 * - atomically increments clicks and sets lastClicked
 * - returns 302 redirect to originalUrl
 * - returns 404 if not found
 */
export async function redirectHandler(req, res, next) {
  try {
    const { code } = req.params;

    // findOneAndUpdate with returnDocument: "after" to get updated doc
    const updated = await Link.findOneAndUpdate(
      { code },
      { $inc: { clicks: 1 }, $set: { lastClicked: new Date() } },
      { new: true } // return the updated document
    ).lean();

    if (!updated) {
      return res.status(404).send("Not found");
    }

    // 302 redirect
    return res.redirect(302, updated.originalUrl);
  } catch (err) {
    next(err);
  }
}

import Link from "../models/Link.js";
import { generateCode, CODE_REGEX } from "../utils/generateCode.js";
import { isValidHttpUrl } from "../utils/validateUrl.js";

/**
 * Create a new short link.
 * Body: { originalUrl: string, customCode?: string }
 */
export async function createLink(req, res, next) {
  try {
    const { originalUrl, customCode } = req.body;

    if (!originalUrl || !isValidHttpUrl(originalUrl)) {
      return res.status(400).json({ error: "Invalid originalUrl" });
    }

     const existingUrl = await Link.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(409).json({
        error: "A short link for this URL already exists",
        code: existingUrl.code
      });
    }

    let code = customCode?.trim();

    if (code) {
      if (!CODE_REGEX.test(code)) {
        return res.status(400).json({ error: "Custom code must be 6–8 alphanumeric characters" });
      }
      // check existence
      const exists = await Link.findOne({ code });
      if (exists) return res.status(409).json({ error: "Code already exists" });
    } else {
      // generate unique code (rare collision loop)
      do {
        code = generateCode();
        // eslint-disable-next-line no-await-in-loop
      } while (await Link.findOne({ code }));
    }

    const doc = await Link.create({ code, originalUrl });
    const shortUrl = `${process.env.BASE_URL || `http://localhost:${process.env.PORT || 4000}`}/${doc.code}`;
    return res.status(201).json({
      code: doc.code,
      shortUrl,
      originalUrl: doc.originalUrl
    });
  } catch (err) {
    next(err);
  }
}

/**
 * List all links
 */
export async function listLinks(req, res, next) {
  try {
    const links = await Link.find().sort({ createdAt: -1 }).lean();
    return res.json(links);
  } catch (err) {
    next(err);
  }
}

/**
 * Get stats for one code
 */
export async function getLink(req, res, next) {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code }).lean();
    if (!link) return res.status(404).json({ error: "Not found" });
    return res.json(link);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a link
 */
export async function deleteLink(req, res, next) {
  try {
    const { code } = req.params;
    const deleted = await Link.findOneAndDelete({ code });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

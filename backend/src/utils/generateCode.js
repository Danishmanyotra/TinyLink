import { customAlphabet } from "nanoid";

export const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

// 6-character generator from [A-Za-z0-9]
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const generateCode = customAlphabet(alphabet, 6);

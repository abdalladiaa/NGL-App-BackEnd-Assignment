import { toMs } from "../times/times.js";

export default function saveTokenInCookie(res, token) {
  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: toMs(1, "hour"),
  });
  return true;
}

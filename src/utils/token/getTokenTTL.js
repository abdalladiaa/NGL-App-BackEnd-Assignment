export default function getTokenTTL(exp) {
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, exp - now);
}

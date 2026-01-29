export function useAppEnv() {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";

  if (hostname === "demo.ghost-id.com") {
    return "demo";
  }
  if (hostname === "app.ghost-id.io") {
    return "prod";
  }

  return null;
}

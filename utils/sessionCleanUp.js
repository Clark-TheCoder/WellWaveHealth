export function setupTokenCleanup(tokenKey = "access_token") {
  window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem(tokenKey);
  });
}

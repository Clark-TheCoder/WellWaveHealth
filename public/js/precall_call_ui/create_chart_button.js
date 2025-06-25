export function createChartButton(call) {
  const chartButton = document.createElement("button");
  chartButton.classList.add("button");
  chartButton.textContent = "Chart";
  chartButton.addEventListener("click", () => {
    if (!call.access_token) {
      console.log("No access token, need to put something here for this.");
    } else {
      sessionStorage.setItem("access_token", call.access_token);
      window.location.href = "/call/visit_summary";
    }
  });
  return chartButton;
}

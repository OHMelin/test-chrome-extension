chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (changes.workSession) {
    const { oldValue, newValue } = changes.workSession;
    if (oldValue !== newValue) {
      checkIfShouldBlock();
    }
  }
});

async function checkIfShouldBlock() {
  const { workSession } = await chrome.storage.local.get(["workSession"]);

  if (workSession === "break") {
    return;
  }

  const blockedSites = ["facebook", "youtube", "twitter"];
  const currentUrl = window.location.hostname;

  if (blockedSites.some((blockedSite) => currentUrl.includes(blockedSite))) {
    document.body.innerHTML = `
        <div style="text-align: center; padding: 50px; background: #f5f5f5;">
        <h1>Site Blocked</h1>
        <p>This site is blocked during your focus session.</p>
        <p>Keep focusing! 🎯</p>
        </div>
    `;
  }
}

checkIfShouldBlock();
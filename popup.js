document.getElementById('setBtn').addEventListener('click', () => {
  const interval = parseInt(document.getElementById('interval').value);
  if (!isNaN(interval) && interval >= 0) {
    chrome.storage.local.set({ interval }, () => {
      chrome.runtime.sendMessage({ type: "UPDATE_INTERVAL", interval });
      alert(`Reminder set for every ${interval} minutes!`);
    });
  } else {
    alert("Please enter a valid number (5 or more).");
  }
});

chrome.storage.local.get("interval", (data) => {
  if (data.interval) {
    document.getElementById("interval").value = data.interval;
  }
});

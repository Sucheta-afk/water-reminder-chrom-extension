function setAlarm(newInterval) {
  chrome.alarms.get('drinkWaterReminder', (existingAlarm) => {
    // Check if alarm exists and already matches desired interval
    if (existingAlarm && existingAlarm.periodInMinutes === newInterval) {
      console.log("Interval is unchanged. Alarm not reset.");
      return;
    }

    // Otherwise, clear and set a new one
    chrome.alarms.clear('drinkWaterReminder', () => {
      chrome.alarms.create('drinkWaterReminder', {
        periodInMinutes: newInterval
      });
      console.log(`Alarm set for every ${newInterval} minutes.`);
    });
  });
}


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("interval", (data) => {
    const interval = data.interval || 60;
    setAlarm(interval);
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "UPDATE_INTERVAL") {
    setAlarm(message.interval);
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'drinkWaterReminder') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: '💧 Time to Hydrate!',
      message: "Take a break and drink some water!",
      priority: 2
    });
  }
});

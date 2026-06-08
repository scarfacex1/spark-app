const MOTIVATIONS = [
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Action is the foundational key to all success. - Pablo Picasso",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Mistakes are proof that you are trying.",
    "Focus on progress, not perfection."
];

const FACTS = [
    "Honey never spoils. You could eat 3,000-year-old Egyptian tomb honey.",
    "Bananas are berries, but strawberries aren't.",
    "A day on Venus is longer than a year on Venus.",
    "Wombat poop is cube-shaped, which stops it from rolling away.",
    "Sloths can hold their breath longer than dolphins can."
];

let intervalId = null;

// Listen for messages from the main web page
self.addEventListener('message', (event) => {
    if (event.data.action === 'startInterval') {
        const ms = event.data.minutes * 60 * 1000; // Convert minutes to milliseconds
        
        // Clear any existing timer first
        if (intervalId) clearInterval(intervalId);
        
        // Trigger one immediately so the user knows it works
        triggerSparkNotification();
        
        // Set up the background interval
        intervalId = setInterval(() => {
            triggerSparkNotification();
        }, ms);
    }
});

function triggerSparkNotification() {
    const isQuote = Math.random() > 0.5;
    const title = isQuote ? "Daily Motivation ✨" : "Did You Know? 🧠";
    const message = isQuote 
        ? MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]
        : FACTS[Math.floor(Math.random() * FACTS.length)];

    // Show the native system notification
    self.registration.showNotification(title, {
        body: message,
        icon: 'https://via.placeholder.com/128', // You can replace this with your app icon URL
        vibrate: [200, 100, 200]
    });
}

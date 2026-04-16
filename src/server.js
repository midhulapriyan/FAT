const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

/**
 * API: returns last ~365 days of "gold rates" data (sample).
 * Replace this generator later with a real API call if needed.
 */
app.get("/api/gold/year", (req, res) => {
  const days = 365;
  const now = new Date();

  // Start with a baseline and add small random walk changes.
  let price = 6500; // e.g., INR per gram or any unit you prefer
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);

    // random walk
    const change = (Math.random() - 0.5) * 20; // +/- 10
    price = Math.max(5000, price + change);

    data.push({
      date: d.toISOString().slice(0, 10),
      price: Math.round(price * 100) / 100
    });
  }

  res.json({ currency: "INR", unit: "per_gram", series: data });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
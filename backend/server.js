const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const csvParser = require("csv-parser"); // Fixed typo

const app = express();
app.use(cors()); // Fixed CORS middleware usage
app.use(bodyParser.json());

const CSV_FILE = "bookings.csv";

// Check if the CSV file exists, if not, create one
if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, "Username,CarNumber,DateTime\n", "utf8");
}

// API route to book a slot (Write to CSV)
app.post("/book-slot", (req, res) => {
  const { username, carNumber, dateTime } = req.body;

  if (!username || !carNumber || !dateTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newEntry = `${username},${carNumber},${dateTime}\n`;

  fs.appendFile(CSV_FILE, newEntry, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving booking" });
    }
    res.json({ message: "Slot booked successfully!" });
  });
});

// Start the server on port 5000 (Backend should not use 5173)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

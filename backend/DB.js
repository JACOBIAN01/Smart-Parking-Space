// backend/DB.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://subhadeep:subha%402003@smart-parking.f9pkrxp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



async function connectToMongo() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db("BookingsDB");
    return db.collection("Booking");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

module.exports = connectToMongo;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToMongo = require("./DB");
const exp = require("constants");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const fixedSlots = [
  "A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A11","A12","A13","A14","A15","A16","A17","A18","A19","A20",
];


app.post("/book-slot", async (req,res)=>{
  const {
    username,
    carNumber,
    vehicleType,
    fromDateTime,
    toDateTime,
    amountPaid,
    Contact,
    email,
    location,
    bookingStatus,
    paymentStatus
  } = req.body;

  if(!username||!carNumber||!fromDateTime||!toDateTime){
    return res.status(400).json({message:"Missing required fields"});
  }

  try{

    const bookingCollection = await connectToMongo();

    //Get All Bookings
    const allbookings = await bookingCollection.find().toArray();

    const usedSlots = allbookings.map(b=>b.slotNumber);

    const availableSlot = fixedSlots.find(slot=>!usedSlots.includes(slot));

    if(!availableSlot){
       return res.status(400).json({ message: "No slots available!" });
    }

    const newBooking = {
      username,carNumber,vehicleType,
      slotNumber:availableSlot,
      fromDateTime:new Date(fromDateTime),
      toDateTime:new Date(toDateTime),
      bookingStatus:bookingStatus||"confirmed",
      paymentStatus:paymentStatus||"Paid",
      amountPaid:amountPaid||0,
      location:location||"VIT AP Main",
      Contact,
      email,
    }

    await bookingCollection.insertOne(newBooking);

     res.status(200).json({
      message: "Slot booked successfully!",
      assignedSlot: availableSlot,
      booking: newBooking,
    });

  }catch(err){
    console.log(err);
     res.status(500).json({ message: "Error booking slot", error: err });
  }
});
















// 🚀 Server Start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
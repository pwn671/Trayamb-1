const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// app.get("", (req, res) => {
//     res.status(200).json({
//         success:true,
//         message:'welcome to full stack app pawan',
//     });
// });
app.use("/api/v1/auth", require("./routes/userRoutes"));
//  app.use("/api/v1/post", require('./routes/postRoutes'));
//app.use("/api/v1/post", require("./routes/postRoutes"));

const PORT =  process.env.PORT || 8080


app.listen(PORT, () => {
    console.log(`server Runnning ${PORT}` .bgGreen.white);
})
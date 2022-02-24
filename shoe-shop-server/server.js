import express from "express";
import dotenv from "dotenv";

// import products  from "./data/Products.js";
import connectDatabase from "./config/mongoDB.js";
import ImportData from "./DataImport.js";

// ROUTE
import productRoute from "./Routes/ProductRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/OrderRoutes.js";

// MIDLEWARE
import { errorHandler, notFound } from "./Middleware/Errors.js";

dotenv.config()
connectDatabase();
const app = express();
app.use(express.json());


// // LOAD ALL PRODUCTS FORM SERVER
// app.get("/api/products", (req, res)=> {
//     res.json(products);
// })


// // LODAD SINGLE PRODUCT FORM SERVER
// app.get("/api/products/:id", (req, res)=> {
//     const produt = products.find((p)=> p._id === req.params.id)
//     res.json(produt);
// })


// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});


// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);


// app.get("/", (req, res)=> {
//     res.send("API is running ........");
// })

const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run in port ❤️ 🇹🇳 🇨🇵 🍕 ⭐️ 👍 👏 😃 🫀 🫁 🧠 ⛑ 🇹🇳 🇨🇵  :  ${PORT}`))

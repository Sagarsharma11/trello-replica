import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();


app.use(morgan('dev'));

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({
    limit: "1MB"
}))

app.use(express.urlencoded({
    limit: "1MB",
    extended: true
}))


// Home Route
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello World!"
    })
})


import taskRoute from "./routes/task.routes.js"
import userRoute from "./routes/user.routes.js"

app.use("/api/v1/task", taskRoute);
app.use("/api/v1/user", userRoute);


export { app }
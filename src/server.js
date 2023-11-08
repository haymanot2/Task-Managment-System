const express = require('express');
import userRoutes from './routes/userRoute';
import taskRoutes from './routes/taskRoutes';
import projectRoutes from './routes/projectRoute';
const cors =require("cors")
const bodyParser=require("body-parser")
require("dotenv").config()
const app = express();
const PORT=process.env.PORT||5000
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use("/api/tasks",taskRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/auth",userRoutes)
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
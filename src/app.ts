import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./error/handleError";
import userRouters from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import categoryRoute from "./routers/category.routes";
import propertyRouter from "./routers/properties.routes";
import scheduleRouter from "./routers/schedule.routes";

const app = express();
app.use(express.json());
app.use("/users", userRouters);
app.use("/login", loginRoutes);
app.use("/categories", categoryRoute);
app.use("/properties", propertyRouter);
app.use("/schedules", scheduleRouter);

app.use(handleError);
export default app;

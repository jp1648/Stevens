//Here you will import route files and export them as used in previous labs
import charactersRoutes from "./characters.js";
import path from "path";
import { static as staticDir } from "express";

const constructorMethod = (app) => {
  app.use("/", charactersRoutes);
  app.use("*", (req, res) => {
    res.status(404).render("error", { body: "404 Error: Page Not Found" });
  });
};

export default constructorMethod;

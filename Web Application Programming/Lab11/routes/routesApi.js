// Set-Up Routes
import { Router } from "express";
const router = Router();
import path from "path";

router.route("/").get(async (req, res) => {
  res.sendFile(path.resolve("static/webpage.html"), {});
});

export default router;

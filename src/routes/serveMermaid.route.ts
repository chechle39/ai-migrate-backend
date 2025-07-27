// src/routes/serveMermaid.route.ts
import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
//http://localhost:3000/mermaid?file=architecture.mmd&dir=C:/Users/HP/Downloads/out-project/architecture
router.get("/", (req, res) => {
  const { file, dir } = req.query;

  if (!file || !dir) return res.status(400).send("Missing file or dir");

  const fullPath = path.resolve(dir as string, file as string);

  if (!fs.existsSync(fullPath)) {
    return res.status(404).send("File not found");
  }

  res.setHeader("Content-Type", "text/plain"); // 👈 quan trọng
  const content = fs.readFileSync(fullPath, "utf-8");
  res.send(content);
});

export default router;

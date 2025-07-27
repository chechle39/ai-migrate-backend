// src/routes/listFiles.ts
import { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/list-files", (req: Request, res: Response) => {
  const dir = req.query.dir as string;

  if (!dir || !fs.existsSync(dir)) {
    return res.status(400).json({ error: "Invalid directory" });
  }

  try {
    const files = fs.readdirSync(dir)
      .filter((f) => f.endsWith(".mmd"));

    return res.json(files);
  } catch (err) {
    console.error("Error listing files:", err);
    return res.status(500).json({ error: "Failed to read directory" });
  }
});

export default router;

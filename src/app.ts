import express from "express";
import analyzeRoute from "./routes/analyze.route";
import path from "path";
import serveMermaid from "./routes/serveMermaid.route";
import cors from "cors";
import listFiles from "./routes/listFiles.route";

const app = express();
app.use(cors());

app.use(express.json());

// Serve static output folder to access .mmd files via browser
app.use("/output", express.static(path.join(__dirname, "..", "output")));
app.use("/mermaid", serveMermaid);
app.use(listFiles);
// Routes
app.use("/api/analyze", analyzeRoute);

export default app;

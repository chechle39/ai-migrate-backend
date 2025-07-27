import { Request, Response } from "express";
import path from "path";
import { runCliAnalyze } from "../utils/runCli";

export async function runAnalyzeHandler(req: Request, res: Response) {
  console.log('req', req)
  const { sourcePath, outputDir } = req.body;

  if (!sourcePath || !outputDir) {
    return res.status(400).json({ error: "Missing sourcePath or outputDir" });
  }
 // Sanitize + normalize
  const absSource = path.resolve(sourcePath);
  const absOutput = path.resolve(outputDir);
  console.log('absSource', absSource);
  try {
    const result = await runCliAnalyze(absSource, absOutput);
    res.status(200).json({
      message: "✅ Analyze completed",
      resultFile: result,
      url: `/output/${path.basename(result)}`
    });
  } catch (error) {
    console.error("❌ Error running CLI:", error);
    res.status(500).json({ error: "Failed to analyze" });
  }
}

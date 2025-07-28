import { exec } from "child_process";
import path from "path";
import fs from "fs";

/**
 * Run ai-migrate-cli analyze
 * @param sourcePath folder chứa mã nguồn
 * @param outputDir folder để lưu file Mermaid
 * @returns đường dẫn file Mermaid được sinh ra
 */
export function runCliAnalyze(sourcePath: string, outputDir: string): Promise<string> {
    // sourcePath = 'C:/Users/HP/Downloads/Hospital-Management-System-main';
    // outputDir = 'C:/Users/HP/Downloads/out-project'
    console.log(sourcePath)
     console.log(outputDir)
    return new Promise((resolve, reject) => {
        const cmd = `npx ai-migrate-cli --path ${sourcePath} --type php --diagram --diagram-out ${outputDir} --ai --filter view model controller`;

        console.log("▶️ Running:", cmd);

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error("exec error:", error);
                reject(error);
                return;
            }
            console.log(stdout);
            console.error(stderr);

            // Kiểm tra output file
            const file = path.join(outputDir, "architecture/architecture.mmd");
            if (fs.existsSync(file)) {
                resolve(file);
            } else {
                reject(new Error("architecture.mmd not found in output"));
            }
        });
    });
}

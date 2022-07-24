"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegBuilder = void 0;
class FfmpegBuilder {
    constructor() {
        this.options = new Map();
    }
    setInput(inputPath) {
        this.options.set('-i', inputPath);
        return this;
    }
    setCodec(codec = 'libx264') {
        this.options.set('-c:v', codec);
        return this;
    }
    setVideoSize(width, height) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }
    setOutput(outputPath) {
        this.outputPath = outputPath;
        return this;
    }
    build() {
        if (!this.options.get('-i') || !this.outputPath) {
            throw new Error('The path to the source file or output file isn\'t set');
        }
        const res = [];
        this.options.forEach((value, key) => {
            res.push(`${key} ${value}`);
        });
        res.push(this.outputPath);
        return res;
    }
}
exports.FfmpegBuilder = FfmpegBuilder;
console.log(new FfmpegBuilder()
    .setInput('C:\\Users\\yukov\\Videos\\Desktop\\source.mp4')
    .setCodec()
    .setVideoSize(1024, 768)
    .setOutput('C:\\Users\\yukov\\OneDrive\\Desktop\\TS-Execution_Utility_Command\\res.avi')
    .build());

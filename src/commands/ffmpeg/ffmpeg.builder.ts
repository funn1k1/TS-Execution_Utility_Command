export class FfmpegBuilder {
  private options: Map<string, string> = new Map(); 
  private outputPath: string;

  public setInput(inputPath: string) {
    this.options.set('-i', inputPath);
    return this;
  }

  public setCodec(codec: string = 'libx264') {
    this.options.set('-c:v', codec);
    return this;
  }
  
  public setVideoSize(width: number, height: number) {
    this.options.set('-s', `${width}x${height}`);
    return this;
  }

  public setOutput(outputPath: string) {
    this.outputPath = outputPath;
    return this;
  }
  
  public build(): string[] {
    if (!this.options.get('-i') || !this.outputPath) {
      throw new Error('The path to the source file or output file isn\'t set')
    }
    const res: string[] = [];
    this.options.forEach((value, key) => {
      res.push(`${key} ${value}`);
    });
    res.push(this.outputPath);
    return res;
  }
}

console.log(
   new FfmpegBuilder()
  .setInput('C:\\Users\\yukov\\Videos\\Desktop\\source.mp4')
  .setCodec()
  .setVideoSize(1024, 768)
  .setOutput('C:\\Users\\yukov\\OneDrive\\Desktop\\TS-Execution_Utility_Command\\res.avi')
  .build()
);
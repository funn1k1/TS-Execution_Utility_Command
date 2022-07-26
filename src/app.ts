import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor';
import { PromptService } from './core/prompts/prompt.service';
import { ConsoleLogger } from './out/console-logger/console-logger';

export class App {
  async run() {
    const ffmpeg = new FfmpegExecutor(ConsoleLogger.getLogger());
    ffmpeg.execute();
  }
}

const app = new App();
app.run();
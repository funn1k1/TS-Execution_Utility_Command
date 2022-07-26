import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { FileService } from '../../core/files/file.service';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { PromptService } from '../../core/prompts/prompt.service';
import { FfmpegBuilder } from './ffmpeg.builder';
import { ICommandExecFfmpeg, IFfmpegInput } from './ffmpeg.types';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();

  protected async prompt(): Promise<IFfmpegInput> {
    const inputPath = await this.promptService.input<string>('Input path: ', 'input');
    const codec = await this.promptService.input<string>('Codec: ', 'input');
    const width = await this.promptService.input<number>('Width: ', 'number');
    const height = await this.promptService.input<number>('Height: ', 'number');
    const outputPath = await this.promptService.input<string>('Output path: ', 'input');
    const format = await this.promptService.input<string>('Format: ', 'input');
    return {
      width,
      height,
      codec,
      inputPath,
      outputPath,
      format 
    };
  }

  protected build({ width, height, codec, inputPath, outputPath, format }: IFfmpegInput): ICommandExecFfmpeg {
    const output = this.fileService.getFilePath(inputPath, outputPath, format);
    console.log('Args: ' + output);
    let builder = (new FfmpegBuilder())
      .setInput(inputPath)
      .setVideoSize(width, height)
      .setOutput(output)
    if (codec != '') {
      builder.setCodec(codec);
    }
    const args = builder.build();
    console.log('Args: ' + args);
    return { command: 'ffmpeg', args, inputPath };
  }

  protected spawn({ command, args }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    return spawn(command, args);
  }

  // delete input file after spawn
  protected async deleteInputFile(inputPath: string) {
    await this.fileService.deleteFileIfExist(inputPath);
  }

  protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}

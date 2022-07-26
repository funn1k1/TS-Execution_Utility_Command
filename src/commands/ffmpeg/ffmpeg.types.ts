import { ICommandExec } from '../../core/executor/command.types';

export interface IFfmpegInput {
  width: number;
  height: number;
  codec: string;
  inputPath: string;
  outputPath: string;
  format: string,
}

export interface ICommandExecFfmpeg extends ICommandExec {
  inputPath: string
}
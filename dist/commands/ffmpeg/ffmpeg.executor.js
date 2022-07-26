"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegExecutor = void 0;
const child_process_1 = require("child_process");
const command_executor_1 = require("../../core/executor/command.executor");
const file_service_1 = require("../../core/files/file.service");
const stream_handler_1 = require("../../core/handlers/stream.handler");
const prompt_service_1 = require("../../core/prompts/prompt.service");
const ffmpeg_builder_1 = require("./ffmpeg.builder");
class FfmpegExecutor extends command_executor_1.CommandExecutor {
    constructor() {
        super(...arguments);
        this.fileService = new file_service_1.FileService();
        this.promptService = new prompt_service_1.PromptService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const inputPath = yield this.promptService.input('Input path: ', 'input');
            const codec = yield this.promptService.input('Codec: ', 'input');
            const width = yield this.promptService.input('Width: ', 'number');
            const height = yield this.promptService.input('Height: ', 'number');
            const outputPath = yield this.promptService.input('Output path: ', 'input');
            const format = yield this.promptService.input('Format: ', 'input');
            return {
                width,
                height,
                codec,
                inputPath,
                outputPath,
                format
            };
        });
    }
    build({ width, height, codec, inputPath, outputPath, format }) {
        const output = this.fileService.getFilePath(inputPath, outputPath, format);
        console.log('Args: ' + output);
        let builder = (new ffmpeg_builder_1.FfmpegBuilder())
            .setInput(inputPath)
            .setVideoSize(width, height)
            .setOutput(output);
        if (codec != '') {
            builder.setCodec(codec);
        }
        const args = builder.build();
        console.log('Args: ' + args);
        return { command: 'ffmpeg', args, inputPath };
    }
    spawn({ command, args }) {
        return (0, child_process_1.spawn)(command, args);
    }
    // delete input file after spawn
    deleteInputFile(inputPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fileService.deleteFileIfExist(inputPath);
        });
    }
    processStream(stream, logger) {
        const handler = new stream_handler_1.StreamHandler(logger);
        handler.processOutput(stream);
    }
}
exports.FfmpegExecutor = FfmpegExecutor;

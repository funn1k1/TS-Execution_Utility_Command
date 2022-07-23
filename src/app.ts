import { PromptService } from './core/prompts/prompt.service';

export class App {
  async run() {
    const prompt = new PromptService();
    const res = await prompt.input<number>('Number', 'number');
    console.log(res);
  }
}

const app = new App();
app.run();
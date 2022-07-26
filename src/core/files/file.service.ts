import { promises } from 'fs';
import { basename, dirname, isAbsolute, join } from 'path';

export class FileService {
  private async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, extension: string) {
    if (!isAbsolute(path)) {
      path = dirname(dirname(dirname(dirname(__filename)))) + '/' + path;
    }
    return join(dirname(path) + '/' + name + '.' + extension);
   }

   public async deleteFileIfExist(path: string) {
    if (await this.isExist(path)) {
      promises.unlink(path);
    }
   }
}
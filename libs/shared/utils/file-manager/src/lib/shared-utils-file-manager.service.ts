import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { defer } from 'rxjs';

@Injectable()
export class SharedUtilsFileManagerService {
  fs = promises;

  writeFile(location: string, content: unknown) {
    return defer(() => this.fs.writeFile(location, JSON.stringify(content)));
  }
}

import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { defer } from 'rxjs';

@Injectable()
export class SharedUtilsFileManagerService {
  fs = promises;

  writeFile(name: string, content: unknown) {
    return defer(() =>
      this.fs.writeFile(
        `${__dirname}/assets/graphs/${name}.json`,
        JSON.stringify(content),
      ),
    );
  }
}

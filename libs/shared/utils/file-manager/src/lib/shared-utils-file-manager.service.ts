import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { defer } from 'rxjs';

@Injectable()
export class SharedUtilsFileManagerService {
  writeFile(name: string, content: unknown) {
    return defer(() =>
      promises.writeFile(
        `${__dirname}/assets/graphs/${name}.json`,
        JSON.stringify(content),
      ),
    );
  }
}

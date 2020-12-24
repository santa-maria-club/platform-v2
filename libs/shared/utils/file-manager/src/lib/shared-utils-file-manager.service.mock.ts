import { Observable, of } from 'rxjs';

import type { ISharedUtilsFileManagerService } from './shared-utils-file-manager.service';

export class SharedUtilsFileManagerServiceMock
  implements ISharedUtilsFileManagerService {
  writeFile(): Observable<void> {
    return of(void 0);
  }

  readDirectory() {
    return of(['sample.json', 'sample-123.json']);
  }

  readFile(location: string) {
    return of({
      id: '123',
      name: 'name-123',
      location,
      nodes: [],
      edges: [],
    });
  }

  rename() {
    return of(void 0);
  }
}

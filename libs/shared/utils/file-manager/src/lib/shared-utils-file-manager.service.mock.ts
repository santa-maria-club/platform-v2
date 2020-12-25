import { Observable, of } from 'rxjs';

import type { ISharedUtilsFileManagerService } from './shared-utils-file-manager.service';

/** Mock implementation of ISharedUtilsFileManagerService  */
export class SharedUtilsFileManagerServiceMock
  implements ISharedUtilsFileManagerService {
  /**
   * Mock version of the update method in ISharedUtilsFileManagerService
   *
   * @returns
   * ```typescript
   *  of(void 0);
   * ```
   */
  writeFile(): Observable<void> {
    return of(void 0);
  }

  /**
   * Mock version of the readDirectory method in ISharedUtilsFileManagerService
   *
   * @returns
   * ```typescript
   *  of(['sample.json', 'sample-123.json']);
   * ```
   */
  readDirectory(): Observable<string[]> {
    return of(['sample.json', 'sample-123.json']);
  }

  /**
   * Mock version of the readFile method in ISharedUtilsFileManagerService
   *
   * @param location A string that indicated a file location.
   * @returns
   * ```typescript
   *  of({
   *    id: '123',
   *    name: 'name-123',
   *    location: location,
   *    nodes: [],
   *    edges: []
   *  });
   * ```
   */
  readFile(location: string): Observable<unknown> {
    return of({
      id: '123',
      name: 'name-123',
      location,
      nodes: [],
      edges: [],
    });
  }

  /**
   * Mock version of the rename method in ISharedUtilsFileManagerService
   *
   * @returns
   * ```typescript
   *  of(void 0);
   * ```
   */
  rename(): Observable<void> {
    return of(void 0);
  }

  /**
   * Mock version of the deleteFile method in ISharedUtilsFileManagerService
   *
   * @returns
   * ```typescript
   *  of(void 0);
   * ```
   */
  deleteFile(): Observable<void> {
    return of(void 0);
  }
}

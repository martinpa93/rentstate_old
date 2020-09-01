import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElectronService } from './electron.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  _uploadFiles = new Subject();
  $uploadFiles = this._uploadFiles.asObservable();

  constructor(
    private electron: ElectronService
  ) {
    this.electron.ipcRenderer.on('reply-upload-files', (event, arg) => {
      this._uploadFiles.next(arg);
    });
  }

  uploadFiles(files) {
    this.electron.ipcRenderer.send('upload-files', files);
    return this.$uploadFiles;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Console } from 'console';
import { FilesService } from 'src/app/core/services/files.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.component.html',
  styleUrls: ['./add-docs.component.scss']
})
export class AddDocsComponent implements OnInit, OnDestroy {

  filesToUpload = [];
  suscriptions: Subscription = new Subscription();

  constructor(
    private fileS: FilesService
  ) { }

  ngOnInit(): void {
  }

  changeFiles(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      const file: File = files[index];
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e,) => {
        this.filesToUpload.push({
          relId: 1,
          typeRel: 'contract',
          name: file.name,
          type: file.type,
          file: e.target.result,
          status: e.target.readyState,
          size: e.total, 
          loaded: e.loaded
        });
        this.suscriptions.add(this.fileS.uploadFiles(this.filesToUpload).subscribe((res) => { console.log(res) }));
        //myReader.result is a String of the uploaded file
      }
      myReader.readAsDataURL(file);
    }
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }
}

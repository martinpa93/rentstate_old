import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { FilesService } from 'src/app/core/services/files.service';

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.component.html',
  styleUrls: ['./add-docs.component.scss']
})
export class AddDocsComponent implements OnInit {

  filesToUpload = [];

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
          name: file.name,
          type: file.type,
          file: e.target.result,
          status: e.target.readyState,
          size: e.total, 
          loaded: e.loaded
        });
        console.log(this.filesToUpload);
        this.fileS.uploadFiles(this.filesToUpload);
        //myReader.result is a String of the uploaded file
        
      }
      myReader.readAsDataURL(file);
    }
  }

}

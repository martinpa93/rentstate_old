import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-properties',
  templateUrl: './filter-properties.component.html',
  styleUrls: ['./filter-properties.component.scss']
})
export class FilterPropertiesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FilterPropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  onReset() {
    this.data = {};
  }

  onSubmit() {
    this.dialogRef.close(this.data);
  }

}

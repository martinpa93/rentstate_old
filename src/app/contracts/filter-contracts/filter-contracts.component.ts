import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-contracts',
  templateUrl: './filter-contracts.component.html',
  styleUrls: ['./filter-contracts.component.scss']
})
export class FilterContractsComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<FilterContractsComponent>,
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

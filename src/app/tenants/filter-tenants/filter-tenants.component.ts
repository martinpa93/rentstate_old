import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-tenants',
  templateUrl: './filter-tenants.component.html',
  styleUrls: ['./filter-tenants.component.scss']
})
export class FilterTenantsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FilterTenantsComponent>,
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

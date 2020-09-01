import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from '../add/add-property/add-property.component';
import { AddTenantComponent } from '../add/add-tenant/add-tenant.component';
import { AddContractComponent } from '../add/add-contract/add-contract.component';
import { AddDocsComponent } from '../add/add-docs/add-docs.component';
import { AddNoteComponent } from '../add/add-note/add-note.component';
import { AddOutgoingComponent } from '../add/add-outgoing/add-outgoing.component';
import { AddIncomeComponent } from '../add/add-income/add-income.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
  }

  addProperty() {
    const dialogRef = this.dialog.open(AddPropertyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addTenant() {
    const dialogRef = this.dialog.open(AddTenantComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addContract() {
    const dialogRef = this.dialog.open(AddContractComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addIncome() {
    const dialogRef = this.dialog.open(AddIncomeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addOutgoing() {
    const dialogRef = this.dialog.open(AddOutgoingComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addDocuments() {
    const dialogRef = this.dialog.open(AddDocsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addNote() {
    const dialogRef = this.dialog.open(AddNoteComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  



}

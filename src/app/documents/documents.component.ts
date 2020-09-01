import { Component, OnInit } from '@angular/core';
import { ContractDoc } from '../core/models/contract';
import { TenantDoc } from '../core/models/tenant';
import { OutgoingDoc, IncomeDoc } from '../core/models/contability';
import { PropertyDoc } from '../core/models/property';
import { mockDocs } from 'src/assets/mocks/documents';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  docs: (IncomeDoc | OutgoingDoc | PropertyDoc | TenantDoc | ContractDoc) [] = mockDocs;

  constructor() { }

  ngOnInit(): void {
  }

}

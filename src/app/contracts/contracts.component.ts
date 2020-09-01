import { Component, OnInit } from '@angular/core';
import { Contract } from '../core/models/contract';
import { mockContracts } from 'src/assets/mocks/contracts';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  contracts: Contract[] = mockContracts;

  constructor() { }

  ngOnInit(): void {
  }

}

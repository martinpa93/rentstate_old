import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/core/models/property';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {

  property: Property;

  constructor() { }

  ngOnInit(): void {
  }

}

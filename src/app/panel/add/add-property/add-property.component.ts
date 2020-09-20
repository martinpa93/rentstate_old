import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Property } from 'src/app/core/models/property';
import { PropertyService } from 'src/app/core/services/property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  property: Property = {type: 'house', country: 'españa'};

  constructor(
    private propertyS: PropertyService
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.propertyS.addProperty(this.property, false).pipe(first()).subscribe((res) => {
      console.log(res);
    });
  }
}

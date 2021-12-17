import { Component, Input } from '@angular/core';
import { Donor } from 'src/app/core/modal/donor';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
})
export class DonorComponent {
  @Input() donor: Donor;
}

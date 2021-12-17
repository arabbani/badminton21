import { Component } from '@angular/core';
import { Donor } from 'src/app/core/modal/donor';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
})
export class DonorsComponent {
  readonly donors: Donor[] = [
    {
      name: 'Umar Kazi',
      title: '2nd Prize Donor',
    },
    {
      name: 'Rashidul Islam',
      title: '3rd Prize Donor',
    },
    {
      name: 'Rashidul Islam',
      title: '3rd Prize Donor',
    },
  ];
}

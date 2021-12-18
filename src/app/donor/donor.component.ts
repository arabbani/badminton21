import { Component, OnInit } from '@angular/core';
import { Donor } from '../core/modal/donor';
import { DonorService } from '../core/services/donor.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donor.component.html',
})
export class DonorComponent implements OnInit {
  donor: Donor;

  constructor(private readonly donorService: DonorService) {}

  ngOnInit(): void {
    this.donor = this.donorService.getDonor();
  }
}

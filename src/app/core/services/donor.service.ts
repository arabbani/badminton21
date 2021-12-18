import { Injectable } from '@angular/core';
import { Donor } from '../modal/donor';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  private readonly donors: Donor[] = [
    {
      name: 'Nakibul Hoque',
      header: 'Donor',
      donation: '10000',
    },
    {
      name: 'Amdadul Islam',
      header: '',
      donation: '10000',
    },
    {
      name: 'Rafiqul Islam',
      header: 'HAB Brick Industry',
      donation: '10000',
    },
    {
      name: 'Omar Kaji',
      donation: 'Second Prize with Trophy',
    },
    {
      name: 'Radhe Raman Dutta',
      donation: '5000',
    },
    {
      name: 'Rafikul Islam',
      header: 'Contractor PWD',
      donation: '5000',
    },
    {
      name: 'Arif Rabbani',
      donation: 'Third Prize with Trophy',
    },
    {
      name: 'Farid Uddin Akhtar',
      header: 'Ex Vice President, AAMSU, Morigaon',
      donation: '5000',
    },
  ];

  donorIndex: number = 0;

  getDonor() {
    let donor = this.donors[this.donorIndex];

    if (this.donorIndex + 1 >= this.donors.length) {
      this.donorIndex = 0;
    } else {
      ++this.donorIndex;
    }

    return donor;
  }
}

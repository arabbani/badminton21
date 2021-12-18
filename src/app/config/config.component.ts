import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Config } from '../core/modal/config';
import { ConfigService } from '../core/services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit, OnDestroy {
  configForm: FormGroup;
  elem: any;
  configSubscription: Subscription;
  config: Config;

  constructor(
    private readonly fb: FormBuilder,
    private readonly configService: ConfigService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.elem = document.documentElement;

    this.configSubscription = this.configService
      .getCofig()
      .subscribe((config) => (this.config = config[0]));
    this.configForm = this.fb.group({
      showDonor: [''],
    });
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  showDonorDialog() {
    this.updateConfig({
      showDonor: true,
    });
  }

  hideDonorDialog() {
    this.updateConfig({
      showDonor: false,
    });
  }

  updateConfig(config: Partial<Config>) {
    this.configService.updateConfig(this.config.id!, config);
  }

  goBack() {
    this.location.back();
  }
}

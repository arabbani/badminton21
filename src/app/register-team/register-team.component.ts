import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../core/modal/player';
import { TeamsService } from '../core/services/teams.service';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.component.html',
})
export class RegisterTeamComponent implements OnInit {
  teamForm: FormGroup;
  saving = false;
  errorText = '';
  saved = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly teamService: TeamsService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      place: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      firstPlayerName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
      secondPlayerName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
      captain: ['', Validators.required],
    });
  }

  async register() {
    this.saving = true;
    this.errorText = '';
    try {
      const firstPlayer: Player = {
        name: this.teamForm.value.firstPlayerName,
      };
      const secondPlayer: Player = {
        name: this.teamForm.value.secondPlayerName,
      };

      if (this.teamForm.value.captain == 1) {
        firstPlayer.captain = true;
      } else {
        secondPlayer.captain = true;
      }

      await this.teamService.addTeam({
        name: this.teamForm.value.name,
        place: this.teamForm.value.place,
        players: [firstPlayer, secondPlayer],
      });
      this.saved = true;
      this.saving = false;
    } catch (error) {
      this.saving = false;
      this.saved = false;
      this.errorText = 'Something went wrong. Pleae try again';
    }
  }

  registerNewTeam() {
    this.teamForm.reset();
    this.saved = false;
    this.errorText = '';
  }

  goBack() {
    this.location.back();
  }
}

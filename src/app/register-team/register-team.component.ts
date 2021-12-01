import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Player } from '../core/modal/player';
import { TeamsService } from '../core/services/teams.service';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.component.html',
})
export class RegisterTeamComponent implements OnInit {
  teamForm: FormGroup;
  playerOneForm: FormGroup;
  playerTwoForm: FormGroup;
  captain = new FormControl('', Validators.required);
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
    });
    this.playerOneForm = this.createPlayerGroup();
    this.playerTwoForm = this.createPlayerGroup();
  }

  get isFormValid() {
    return (
      this.teamForm.valid &&
      this.playerOneForm.valid &&
      this.playerTwoForm.valid
    );
  }

  async register() {
    this.saving = true;
    this.errorText = '';
    try {
      const player1: Player = this.playerOneForm.value;
      const player2: Player = this.playerTwoForm.value;

      if (this.captain.value == 1) {
        player1.captain = true;
      } else {
        player2.captain = true;
      }

      await this.teamService.addTeam({
        ...this.teamForm.value,
        players: [player1, player2],
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
    this.playerOneForm.reset();
    this.playerTwoForm.reset();
    this.captain.reset();
    this.saved = false;
  }

  goBack() {
    this.location.back();
  }

  private createPlayerGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      jersyNumber: [''],
      age: ['', [Validators.required, Validators.pattern('[0-9]{2}')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }
}

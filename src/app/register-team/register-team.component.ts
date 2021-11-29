import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Player } from '../core/modal/player';
import { PlayerService } from '../core/services/player.service';
import { TeamsService } from '../core/services/teams.service';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.component.html',
  styleUrls: ['./register-team.component.css'],
})
export class RegisterTeamComponent implements OnInit {
  teamForm: FormGroup;
  playerOneForm: FormGroup;
  playerTwoForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private playerService: PlayerService,
    private teamService: TeamsService
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
    try {
      const [player1Ref, player2Ref] = await Promise.all([
        this.addPlayer(this.playerOneForm.value),
        this.addPlayer(this.playerTwoForm.value),
      ]);
      await this.teamService.addTeam({
        ...this.teamForm.value,
        players: [player1Ref.id, player2Ref.id],
      });
      this.teamForm.reset();
      this.playerOneForm.reset();
      this.playerTwoForm.reset();
    } catch (error) {}
  }

  private addPlayer(player: Player) {
    return this.playerService.addPlayer(player);
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

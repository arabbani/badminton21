import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Team } from 'src/app/core/modal/team';
import { MatchService } from 'src/app/core/services/match.service';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
})
export class CreateMatchComponent implements OnInit {
  teams$: Observable<Team[]>;
  selectedTeams: DocumentReference<DocumentData>[] = [];
  errorText = '';
  saving = false;
  saved = false;

  constructor(
    private readonly teamsService: TeamsService,
    private readonly matchService: MatchService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.teams$ = this.teamsService.teams$;
  }

  async createMatch() {
    this.saving = true;
    this.errorText = '';
    try {
      await this.matchService.createMAtch({
        team1: this.selectedTeams[0],
        team2: this.selectedTeams[1],
      });
      this.saving = false;
      this.saved = true;
    } catch (error) {
      this.saved = true;
      this.saving = false;
      this.errorText = 'Something went wrong. Pleae try again';
    }
  }

  goBack() {
    this.location.back();
  }

  selectTeam(team: Team) {
    this.selectedTeams.push(team.id!);
  }

  deselectTeam(team: Team) {
    this.selectedTeams = this.selectedTeams.filter(
      (teamId) => teamId !== team.id
    );
  }

  isTeamSelected(team: Team) {
    return this.selectedTeams.includes(team.id!);
  }

  selectionAllowed() {
    return this.selectedTeams.length < 2;
  }
}

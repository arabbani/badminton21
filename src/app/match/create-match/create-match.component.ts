import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flatten, uniq } from 'lodash';
import { combineLatestWith, Subscription } from 'rxjs';
import { SetNumber } from 'src/app/core/modal/set-number';
import { Team } from 'src/app/core/modal/team';
import { MatchService } from 'src/app/core/services/match.service';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
})
export class CreateMatchComponent implements OnInit, OnDestroy {
  teams: Team[];
  teamsSubscription: Subscription;
  selectedTeams: string[] = [];
  errorText = '';
  saving = false;
  saved = false;
  matchForm: FormGroup;

  constructor(
    private readonly teamsService: TeamsService,
    private readonly matchService: MatchService,
    private readonly location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.matchForm = this.fb.group({
      numberOfSets: [3, [Validators.required, Validators.pattern('[0-9]*')]],
      winningPoint: [15, [Validators.required, Validators.pattern('[0-9]*')]],
    });

    this.teamsSubscription = this.teamsService.teams$
      .pipe(combineLatestWith(this.matchService.matches$))
      .subscribe(([teams, matches]) => {
        const activeMatches = uniq(
          flatten(
            matches
              .filter(
                (match) => match.scheduled || match.ongoing || !match.finished
              )
              .map((match) => [match.firstTeam, match.secondTeam])
          )
        );
        this.teams = teams.filter(
          (team) => !team.exited && !activeMatches.includes(team.id!)
        );
      });
  }

  async createMatch() {
    this.saving = true;
    this.errorText = '';
    try {
      await this.matchService.createMAtch({
        firstTeam: this.selectedTeams[0],
        secondTeam: this.selectedTeams[1],
        ...this.matchForm.value,
        sets: [
          {
            setNumber: SetNumber.First,
            firstTeamPoint: 0,
            secondTeamPoint: 0,
          },
        ],
        currentSet: SetNumber.First,
        currentSetWinningPoint: this.matchForm.value.winningPoint,
      });
      this.saving = false;
      this.saved = true;
    } catch (error) {
      this.saved = true;
      this.saving = false;
      this.errorText = 'Something went wrong. Pleae try again';
    }
  }

  ngOnDestroy() {
    if (this.teamsSubscription) {
      this.teamsSubscription.unsubscribe();
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

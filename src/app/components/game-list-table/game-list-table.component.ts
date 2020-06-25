import {Component} from '@angular/core';
import {GetGamesListService} from '../../services/get-games-list.service';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-game-list-table',
  styleUrls: ['game-list-table.component.scss'],
  template: `
      <table>
          <tr>
              <th>GameName</th>
              <th>Player1</th>
              <th>Player2</th>
          </tr>
          <tr *ngFor="let game of games"
              (click)="selectGame(game)"
              [class.highlighted]="game[0] === selectedGame">
              <td>{{game[0]}}</td>
              <td>{{game[1]}}</td>
              <td>{{game[2]}}</td>
          </tr>
      </table>
      <button (click)="enableEnterGameForm()">Enter Game</button>
      <button (click)="newGame()">New Game</button>
      <button (click)="enableDeleteGameForm()">Delete Game</button>
      <br>
      <app-delete-game-form *ngIf="deletingGame===true" [gamename]="selectedGame"></app-delete-game-form>
      <app-enter-game-form *ngIf="enteringGame===true" [gamename]="selectedGame"></app-enter-game-form>
  `
})

export class GameListTableComponent{
  constructor(
    private getGamesListService: GetGamesListService,
    private router: Router){
  }

  public games;
  public selectedGame = '';
  public deletingGame = false;
  public enteringGame = false;
  public destroyed = new Subject<any>();

  ngOnInit(): void {

    // fetches data on initial page route
    this.fetchGameList();

    // fetches data on re-routing to same page
    // (should also be fetching data on initial page load, but doesn't for some reason?)
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.fetchGameList();
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  fetchGameList(){
    this.getGamesListService.getGamesListFromLambda().subscribe((response) => {
      this.games = response.body['GameList'];
      console.log(response);
    });
  }

  selectGame(game){
    console.log(game[0], game[1], game[2]);
    this.selectedGame = game[0];

    // close any open forms
    this.deletingGame = false;
    this.enteringGame = false;

    console.log(this.selectedGame);
  }

  newGame(){
    this.router.navigate(['/newgame']);
  }

  enableDeleteGameForm(){
    if(this.selectedGame !== ''){
      // open game delete form, close game enter form
      this.deletingGame = true;
      this.enteringGame = false;
    }
  }

  enableEnterGameForm(){
    if(this.selectedGame !== ''){
      // open game enter form, close game delete from
      this.enteringGame = true;
      this.deletingGame = false;
    }
  }
}

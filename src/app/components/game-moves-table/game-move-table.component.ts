import {Component} from '@angular/core';
import {GetGameMovesService} from '../../services/get-game-moves.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-game-move-table',
  styleUrls: ['game-move-table.component.scss'],
  template: `
      <table>
          <tr><th>Move</th><th>TimeStamp</th></tr>
          <tr *ngFor="let move of moves">
              <td>{{move[0]}}</td>
              <td>{{newDate(move[1])}}</td>
          </tr>
      </table>
    <button *ngIf="newMove===false" (click)="newMoveForm()">New Move</button>
    <br>
    <app-new-move-form *ngIf="newMove===true" [gameName]="gamename"></app-new-move-form>
  `
})

export class GameMoveTableComponent{
  constructor(private getGameMovesService: GetGameMovesService,
              private route: ActivatedRoute){}

  gamename = '';
  moves;
  public newMove = false;

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.gamename = params.get('gamename');
    });

    this.getGameMovesService.gameMoves.subscribe(value => {this.moves = value;});
  }

  newMoveForm(){
    this.newMove = true;
  }

  newDate(timestamp: number){
    return new Date(timestamp * 1000);
  }
}

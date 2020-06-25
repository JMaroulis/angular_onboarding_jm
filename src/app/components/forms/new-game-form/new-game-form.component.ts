import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PutGameService} from '../../../services/put-game.service';

@Component({
  selector: 'app-new-game-form',
  styleUrls: ['../form.component.scss'],
  template: `
      <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
          <div>
              Game Name: <br>
              <input
                      type="text"
                      name="gamename"
                      #gamename="ngModel"
                      required
                      [(ngModel)]="newGame.gamename">
              <div class="errorMessage" [hidden]="gamename.valid || gamename.pristine">
                  Game Name is required.
              </div>
          </div>
          <div>
              Player 1:<br>
              <input
                      type="text"
                      name="player1"
                      #player1="ngModel"
                      required
                      [(ngModel)]="newGame.player1">
              <div class="errorMessage" [hidden]="player1.valid || player1.pristine">
                  Player1 is required.
              </div>
          </div>
          <div>
              Player 2:<br>
              <input
                      type="text"
                      name="player2"
                      #player2="ngModel"
                      required
                      [(ngModel)]="newGame.player2">
              <div class="errorMessage" [hidden]="player2.valid || player2.pristine">
                  Player2 is required.
              </div>
          </div>
          <div>
              Password:<br>
              <input
                      type="password"
                      name="password"
                      #password="ngModel"
                      required
                      [(ngModel)]="newGame.password">
              <div class="errorMessage" [hidden]="password.valid || password.pristine">
                  Password is required.
              </div>
          </div>
          <div>
              Confirm Password:<br>
              <input
                      type="password"
                      name="confirmPassword"
                      #confirmPassword="ngModel"
                      required
                      [(ngModel)]="newGame.confirmPassword">
              <div class="errorMessage"
                   [hidden]="confirmPassword.valid || confirmPassword.pristine || password.value === confirmPassword.value">
                  Password Confirmation is required.
              </div>
              <div class="errorMessage" [hidden]="password.value === confirmPassword.value">
                  The two passwords do not match.
              </div>
          </div>
          <div>
              <div class="errorMessage" [hidden]="submitError === ''">
                  {{submitError}}
              </div>
              <button type="submit" [disabled]="form.invalid">
                  Create Game
              </button>
          </div>
          <div>Value:{{ form.value | json }}</div>
          <div>Valid:{{ form.valid | json }}</div>
          <div>Invalid:{{ form.invalid | json }}</div>
      </form>
  `
})

export class NewGameFormComponent{
  constructor(
    private router: Router,
    private putGameService: PutGameService,
    ){}

  public submitError = '';

  newGame = {
    gamename: '',
    player1: '',
    player2: '',
    password: '',
    confirmPassword: ''
  };

  handleSubmit(formValue, isValid: boolean){
    if(isValid){
      this.putGameService.putNewGame(this.newGame)
      .subscribe((response) => {
        if(response.body['Status'] === `Successfully created ${this.newGame.gamename}.`){
          console.log(response);
          this.router.navigate(['/gamelist']);
        }
        else {
          console.log(response.body['Status']);
          this.submitError = response.body['Status'];
        }
      });
  }
 }
}

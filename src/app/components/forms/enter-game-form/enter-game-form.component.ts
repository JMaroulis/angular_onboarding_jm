import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {GetGameMovesService} from '../../../services/get-game-moves.service';

@Component({
  selector: 'app-enter-game-form',
  styleUrls: ['../form.component.scss'],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
        <div>
            Password:<br>
            <input
                type="text"
                name="password"
                #pass="ngModel"
                required
                [(ngModel)]="password">
        </div>
        <div class="errorMessage" [hidden]="pass.valid || pass.pristine">
            Password is required.
        </div>
        <div class="errorMessage" [hidden]="submitError === ''">
            {{submitError}}
        </div>
        <div>
            <button type="submit" [disabled]="form.invalid">
                Confirm
            </button>
        </div>

    </form>
  `
})

export class EnterGameFormComponent{
  constructor(
    private router: Router,
    private getGameMovesService: GetGameMovesService){}

  @Input()
  public gamename = '';
  public password = '';
  public submitError = '';

  handleSubmit(formValue, isValid: boolean){
    if (isValid){
      this.getGameMovesService.loadGameMoves(this.gamename, this.password)
      .subscribe((response) => {
        if(response.body['Status']){
          this.submitError = response.body['Status'];
        }
        else {
          this.router.navigate(['/gamemoves', this.gamename]);
        }
      });
    }
  }
}

import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {DeleteGameService} from '../../../services/delete-game.service';

@Component({
  selector: 'app-delete-game-form',
  styleUrls: ['../form.component.scss'],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
        <p>Are you sure you want to delete this game?</p>
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
                Yes, I'm sure
            </button>
        </div>
    </form>
  `
})

export class DeleteGameFormComponent{
  constructor(
    private router: Router,
    private deleteGameService: DeleteGameService){}

  @Input()
  public gamename = '';
  public password = '';
  public submitError = '';

  handleSubmit(formValue, isValid: boolean){
    if(isValid){
      this.deleteGameService.deleteGame(this.gamename, this.password)
        .subscribe((response) => {
          console.log(response);
          if(response.body['Status'] === `Successfully deleted ${this.gamename}.`){
            console.log('Deletion success!');
          }
          else{
            console.log('Deletion Failure!');
            this.submitError = response.body['Status'];
          }
          this.router.navigate(['gamelist']);
        });
    }
  }
}

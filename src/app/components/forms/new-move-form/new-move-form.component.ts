import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {PutMoveService} from '../../../services/put-move.service';

@Component({
  selector: 'app-new-move-form',
  styleUrls: ['../form.component.scss'],
  template: `
      <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
          <div>
              Move:
              <input
                      type="text"
                      name="move"
                      #move="ngModel"
                      required
                      [(ngModel)]="newMove.move">
          </div>
          <div class="errorMessage" [hidden]="move.valid || move.pristine">
              Move is required.
          </div>
          <div>
              Player:
              <input
                      type="text"
                      name="player"
                      #player="ngModel"
                      required
                      [(ngModel)]="newMove.player">
          </div>
          <div class="errorMessage" [hidden]="player.valid || player.pristine">
              Player is required.
          </div>
          <div class="errorMessage" [hidden]="submitError === ''">
              {{submitError}}
          </div>
          <div>
              <button type="submit" [disabled]="form.invalid">
                  Commit Move
              </button>
          </div>
      </form>
  `
})

export class NewMoveFormComponent{
  constructor(
    private router: Router,
    private putmoveservice: PutMoveService ){}

  @Input()
  public gameName = '';
  public newMove = {
    move: '',
    player: ''
  };
  public submitError = '';

  handleSubmit(formValue, isValid: boolean){
    if(isValid){
      this.putmoveservice.putNewMove(this.gameName, this.newMove.move).subscribe((response) => {
        if(response.body['Status']){
          console.log(response.body['Status']);
          this.submitError = response.body['Status'];
        }
        else{
          console.log(response);
          this.router.navigate(['/gamelist']);
        }
      });
    }
  }

}

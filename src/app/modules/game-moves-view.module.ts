import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {GameMoveTableComponent} from '../components/game-moves-table/game-move-table.component';

import {GetGameMovesService} from '../services/get-game-moves.service';
import {NewMoveFormComponent} from '../components/forms/new-move-form/new-move-form.component';
import {FormsModule} from '@angular/forms';
import {PutMoveService} from '../services/put-move.service';

@NgModule({
  declarations: [GameMoveTableComponent, NewMoveFormComponent],
  imports: [CommonModule, BrowserModule, FormsModule],
  providers: [GetGameMovesService, PutMoveService],
  bootstrap: [],
})
export class GameMovesViewModule{}

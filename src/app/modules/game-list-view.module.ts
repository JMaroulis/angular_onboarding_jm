import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {GameListTableComponent} from '../components/game-list-table/game-list-table.component';
import {NewGameFormComponent} from '../components/forms/new-game-form/new-game-form.component';

import {GetGamesListService} from '../services/get-games-list.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeleteGameFormComponent} from '../components/forms/delete-game-form/delete-game-form.component';
import {PutGameService} from '../services/put-game.service';
import {DeleteGameService} from '../services/delete-game.service';
import {EnterGameFormComponent} from '../components/forms/enter-game-form/enter-game-form.component';

@NgModule({
  declarations: [GameListTableComponent, NewGameFormComponent, DeleteGameFormComponent, EnterGameFormComponent],
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [GetGamesListService, PutGameService, DeleteGameService],
  bootstrap: [],
})
export class GameListViewModule{}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListTableComponent } from './components/game-list-table/game-list-table.component';
import { GameMoveTableComponent } from './components/game-moves-table/game-move-table.component';
import { NewGameFormComponent } from './components/forms/new-game-form/new-game-form.component';

const routes: Routes = [
  { path: 'gamelist', component: GameListTableComponent},
  { path: 'newgame', component: NewGameFormComponent},
  { path: 'gamemoves/:gamename', component: GameMoveTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

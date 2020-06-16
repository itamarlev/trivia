import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GameComponent} from './components/trivia/game/game.component';
import {TriviaComponent} from './components/trivia/trivia.component';
import {ResultsViewComponent} from './components/trivia/results-view/results-view.component';


const routes: Routes = [
  {path: '', component: TriviaComponent},
  {path: 'game', component: GameComponent},
  {path: 'results', component: ResultsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

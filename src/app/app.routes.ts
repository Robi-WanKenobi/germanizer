import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VerbsComponent } from './pages/verbs/verbs.component';
import { VerbsLevelSelectionComponent } from './components/verbs-level-selection/verbs-level-selection.component';
import { DerdiedasComponent } from './pages/derdiedas/derdiedas.component';
import { GamesComponent } from './pages/games/games.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'games', component: GamesComponent },
    { path: 'verbs', component: VerbsLevelSelectionComponent },
    { path: 'verbs/practice', component: VerbsComponent },
    { path: 'nouns/practice', component: DerdiedasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

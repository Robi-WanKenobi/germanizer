import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { VerbPracticeComponent } from './components/verb-practice/verb-practice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from "../environments/environment";
import { HomeComponent } from './pages/home/home.component';
import { VerbsComponent } from './pages/verbs/verbs.component';
import { AppRoutingModule } from './app.routes';
import { ContactComponent } from './components/contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VerbsLevelSelectionComponent } from './components/verbs-level-selection/verbs-level-selection.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { DerdiedasComponent } from './pages/derdiedas/derdiedas.component';
import { NounPracticeComponent } from './components/noun-practice/noun-practice.component';
import { GamesComponent } from './pages/games/games.component';
import { VerbsInfoComponent } from './components/verbs-info/verbs-info.component';

@NgModule({
  declarations: [
    AppComponent,
    VerbPracticeComponent,
    HomeComponent,
    VerbsComponent,
    ContactComponent,
    VerbsLevelSelectionComponent,
    ExerciseCardComponent,
    DerdiedasComponent,
    NounPracticeComponent,
    GamesComponent,
    VerbsInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

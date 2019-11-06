import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
=======
import { WorkoutComponent } from './workout/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';
>>>>>>> 4bb7f68f242628ad127212461982829d2c9247cc

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< HEAD
    RegisterComponent
=======
    WorkoutComponent,
    ExerciseComponent
>>>>>>> 4bb7f68f242628ad127212461982829d2c9247cc
  ],
  imports: [
    BrowserModule,       
    HttpClientModule, // import HttpClientModule after BrowserModule.
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

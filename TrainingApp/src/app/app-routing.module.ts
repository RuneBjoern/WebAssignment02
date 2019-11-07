import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { WorkoutComponent } from './workout/workout.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExerciseComponent } from './exercise/exercise.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'workout', component: WorkoutComponent},
  {path: 'exercise', component: ExerciseComponent},
  {path: 'exercise/:workId', component: ExerciseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

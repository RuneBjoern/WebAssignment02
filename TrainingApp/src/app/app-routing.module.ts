import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
=======
import { WorkoutComponent } from './workout/workout.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExerciseComponent } from './exercise/exercise.component';
>>>>>>> 4bb7f68f242628ad127212461982829d2c9247cc


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'workout', component: WorkoutComponent},
  {path: 'exercise', component: ExerciseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

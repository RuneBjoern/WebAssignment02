import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}
  public wouts = []

  ngOnInit(){
    this.getWorkouts();
    
  }

  createWorkout(formValue){
    this.api.postWorkout({workoutname: formValue.workoutFromFrontend, ownerId: localStorage.getItem('user')}).subscribe();
    this.getWorkouts();
  }
  
  getWorkouts(){
    this.api.getWorkout()
    .subscribe(data => {
      this.wouts = []
      data.data.workouts.forEach( w => {
      if(localStorage.getItem('JWT')){
        
        if(w.ownerId == localStorage.getItem('user')){
          this.wouts.push(w);
        }
      } else {
        this.wouts.push(w)
      }
      });
      console.log(this.wouts)
      }, err => {
        console.log(err.message)
      }, () => {
        console.log("Complete")
      });
  }

  getExercises(){

  }

  logout(){
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}

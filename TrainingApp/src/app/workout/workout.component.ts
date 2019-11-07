import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  constructor(private api: ApiService) {}
  public aa = []
  ngOnInit(){
    this.getWorkouts();
    
  }
  getWorkouts(){
    this.api.getWorkout()
    .subscribe(data => {
      data.data.workouts.forEach( w => {
        
      this.aa.push(w)
      });
      console.log(this.aa)
      }, err => {
        console.log(err.message)
      }, () => {
        console.log("Complete")
      });
  }

}

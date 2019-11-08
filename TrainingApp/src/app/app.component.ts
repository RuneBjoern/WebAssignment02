import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrainingApp';

  user: User[] = [] 
  //headers: string[];
  spresp: any;
  postdata: User;

  constructor(private api: ApiService) {}

  ngOnInit(){
    this.getWorkouts();
    
  }
  getWorkouts(){
    this.api.getWorkout()
    .subscribe(data => {
      console.log(data);
      }, err => {
        console.log(err.message)
      }, () => {
        console.log("Complete")
      });
  }

  

  
}
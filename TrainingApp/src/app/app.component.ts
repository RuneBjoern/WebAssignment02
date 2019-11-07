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
/*         const keys = resp.headers.keys();

        this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);

        for (const data of resp.body){
          this.user.push(data);
        }      
        console.log(this.user); */
      }, err => {
        console.log(err.message)
      }, () => {
        console.log("Complete")
      });
  }

  getUsers(){
    this.api.getUser()
    .subscribe(data => {
      console.log(data);
/*         const keys = resp.headers.keys();

        this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);

        for (const data of resp.body){
          this.user.push(data);
        }      
        console.log(this.user); */
      });
  }

  getUserByID(id: any){
    this.api.getUserById(id)
      .subscribe(data => { console.log(data);
      });
  }

  addUser(){
    this.api.addUser(this.postdata)
      .subscribe(resp => {return this.spresp.push(resp)
      });
  }

  updateUser(id:any){
    this.api.updateUser(id, this.postdata)
      .subscribe(resp => {return this.spresp.push(resp)
      });
  }

  deleteUser(id: any){
    this.api.deleteUser(id)
      .subscribe(resp => {return this.spresp.push(resp);
      });
  }
}
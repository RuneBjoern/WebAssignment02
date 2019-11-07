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
  headers: string[];

  constructor(private api: ApiService) {}

  ngOnInit(){
    this.getUsers();

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
      .subscribe(data=>{ console.log(data);
      });
  }
}

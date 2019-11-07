import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "src/services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  public show:boolean = false;
  private error:string = "";
  
  
  
  ngOnInit() {
    let username:string;
  }
  toggle() {
    this.show = !this.show
  }

  logOrReg(formData){
    console.log(formData)
    if(formData.repPassword){
      console.log("Registering");
    } else {
      console.log("Logging in...");
      return this.login(formData.email, formData.password)
    }
  }

  login(_email, _password){
    console.log("ll")
    this.api.authUser({email: _email, password:_password})
    .subscribe(data => {
      try{
        if(data.data.user){
          localStorage.setItem('JWT', data.data.token);
          localStorage.setItem('user', data.data.user._id);
          this.router.navigate(['/workout'])
        }
      } catch (error) {
        this.error = "Wrong pass/email";
      }
      
      });
  }
  
  register(username, email, password, rpassword){
    
    this.api.authUser({email: "ej@med.dig", password:"123bosse"})
    .subscribe(data => {
      if(data.data.user){
        localStorage.setItem('JWT', data.data.token);
        this.router.navigate(['/workout'])
      } else {
        this.error = "Wrong pass/email";
      }
      });
  }

  guest(){
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    this.router.navigate(['/workout']);
  }

}

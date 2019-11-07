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
      this.register(formData.username, formData.email, formData.password, formData.repPassword)
    } else {
      console.log("Logging in...");
      return this.login(formData.email, formData.password)
    }
  }

  login(_email, _password){
    console.log("login")
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
  
  register(_username, _email, _password, _rpassword){
    if(_password == _rpassword){
    console.log("register")
      this.api.registerUser({username: _username, email: _email, password: _password})
      .subscribe(data => {
        if(data.status == "success"){
          this.login(_email, _password);
        } else {
          this.error = "Wtf?";
        }
        });
    } else {
      this.error = "Pass do'nt match";
    }
    
  }

  guest(){
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    this.router.navigate(['/workout']);
  }

}

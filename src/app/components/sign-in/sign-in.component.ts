import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  error:string = '';

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

  btnRegistre(username,password)
  {
    if(username != '' && password != ''){
      this.authService.SignIn(username,password);
    }else{
      this.error = "Email or password incorrect";
    }
  }

}

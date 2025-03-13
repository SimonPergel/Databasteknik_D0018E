import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Authentication } from '../models/authentication.models';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  constructor(
    private routes: Router,
    private dataService: DataService
  ) {}
  authentication: Authentication []=[]
  signUpEmail: string = '';
  signUpUsername: string = '';
  signUpPassword: string = '';
  username: string = '';
  password: string = '';

  async onSubmit() {
    await this.GetAuthentication()
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    try {
      if (this.authentication[0].id != null) {
        console.log('User ID:', this.authentication[0].id)
        localStorage.setItem("token", this.authentication[0].id.toString())
        this.routes.navigate(['/'], { queryParams: { id: this.authentication[0].id }, queryParamsHandling: 'merge' })
      }
    } catch (error: any) {
      alert("Invalid login!");
    }
  }

  GetAuthentication(): Promise<void> {
    return fetch("http://localhost:5201/api/mycontroller/getauthentication?username="+this.username+"&password="+this.password)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      this.authentication = data
    })
    .catch(error => console.error("API call failed:", error));
  }

  GetNewUserInfo(): Promise<void> {
    return fetch("http://localhost:5201/api/mycontroller/getauthentication?username="+this.signUpUsername+"&password="+this.signUpPassword)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      this.authentication = data
    })
    .catch(error => console.error("API call failed:", error));
  }

  async onSignUp() {
    if (await this.dataService.checkIfUserExists(this.signUpUsername) || await this.dataService.checkIfEmailExists(this.signUpEmail)) {
      alert("A user with this username already exists, please try a different one");
      return
    }
    await this.dataService.createNewUser(this.signUpEmail, this.signUpUsername, this.signUpPassword);
    await this.GetNewUserInfo();
    await this.dataService.createNewProfile(this.authentication[0].id, this.signUpUsername);
    console.log('User ID:', this.authentication[0].id);
    localStorage.setItem("token", this.authentication[0].id.toString());
    this.routes.navigate(['/'], { queryParams: { id: this.authentication[0].id }, queryParamsHandling: 'merge' });
  }
}

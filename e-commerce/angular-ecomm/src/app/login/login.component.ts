import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Authentication } from '../models/authentication.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  constructor(private routes: Router) {}
  authentication: Authentication []=[]
  username: string = '';
  password: string = '';

  async onSubmit() {
    await this.GetAuthentication()
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    if (this.authentication[0].id != null) {
      console.log('User ID:', this.authentication[0].id)
      this.routes.navigate(['/'], { queryParams: { id: this.authentication[0].id }, queryParamsHandling: 'merge' })
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
}

import { Routes } from '@angular/router';
import { json1component } from './json-1/json-1.component';

export const routes: Routes = [
    {path : 'json1', component: json1component},
    { path: '', redirectTo: '/json1', pathMatch: 'full' }  
];

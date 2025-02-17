import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { json1component } from './json-1/json-1.component';

const routes: Routes = [
  { path: '', component: json1component }, // Default route
  { path: '**', redirectTo: '', pathMatch: 'full' } // Catch-all redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './component/Authentication/AuthenticationGuard';


export const routes: Routes = [{
        path: '',
        pathMatch: 'full',
        component: ProductsListComponent,
},
{
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthenticationGuard],

},
{
        path: 'login',
        component: LoginComponent,
}
];

import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './component/Authentication/AuthenticationGuard';
import { AddProductComponent } from './component/Addproduct/addproduct.component';


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
},
{
        path: 'addproduct',
        component: AddProductComponent,
},
];

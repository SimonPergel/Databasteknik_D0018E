import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './component/Authentication/AuthenticationGuard';
import { AddProductComponent } from './component/Addproduct/addproduct.component';
import { OrderHistoryComponent } from './pages/cart/checkout/order-history/order-history.component';
import { CommentsComponent } from './components/comments/comments.component';


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
{
        path: 'orderHistory',   // the correct name here
        component: OrderHistoryComponent,

},
{
        path: 'comments',
        pathMatch: 'full',
        component: CommentsComponent,
}

];

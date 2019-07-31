import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';

export const appRoutes: Routes = [
    {
        path : 'signup' , component : UserComponent,
        children : [{ path : '' , component : SignUpComponent }]
    },
    {
        path : 'login' , component : UserComponent,
        children : [{ path : '' , component : LoginComponent }]
    },
    {
        path : 'userprofile' , component : UserProfileComponent,canActivate : [AuthGuard]
    },
    {
        path : 'home' , component : HomeComponent
    },
    {
        path : 'main' , component : MainComponent
    },
    {
        path : '' ,redirectTo : '/main' ,pathMatch : 'full'
    }
];
import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { authGuard } from '../authGuard/auth.guard';
import { StepperComponent } from '../stepper/stepper.component';
import { UserDetailsComponent } from '../component/user-details/user-details.component';
import { ThankyouComponent } from '../component/thankyou/thankyou.component';
import { HomeComponent } from '../component/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
    { path: 'register', component: StepperComponent,canActivate: [authGuard] },
    { path: 'thankyou/:studentId', component: ThankyouComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' , pathMatch: 'full' } 
];

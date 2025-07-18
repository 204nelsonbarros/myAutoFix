import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.page').then(m => m.ServicesPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.page').then(m => m.HistoryPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'select-location/:id',
    loadComponent: () => import('./select-location/select-location.page').then(m => m.SelectLocationPage)
  },
  {
    path: 'assistance-type',
    loadComponent: () => import('./assistance-type/assistance-type.page').then(m => m.AssistanceTypePage)
  },
  {
    path: 'mechanics-list',
    loadComponent: () => import('./mechanics-list/mechanics-list.page').then(m => m.MechanicsListPage)
  },
  {
    path: 'tow-list',
    loadComponent: () => import('./tow-list/tow-list.page').then(m => m.TowListPage)
  },
  {
    path: 'mechanic-details/:id',
    loadComponent: () => import('./mechanic-details/mechanic-details.page').then(m => m.MechanicDetailsPage)
  },
  {
    path: 'tow-details/:id',
    loadComponent: () => import('./tow-details/tow-details.page').then(m => m.TowDetailsPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.page').then( m => m.PaymentPage)
  },
  {
    path: 'service-completed',
    loadComponent: () => import('./service-completed/service-completed.page').then( m => m.ServiceCompletedPage)
  },
  {
    path: 'feedback',
    loadComponent: () => import('./feedback/feedback.page').then( m => m.FeedbackPage)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
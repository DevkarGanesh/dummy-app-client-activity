import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }         from './pages/home/home.component';
import { BookingComponent }      from './pages/booking/booking.component';
import { ItineraryComponent }    from './pages/itinerary/itinerary.component';
import { PaymentComponent }      from './pages/payment/payment.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

const routes: Routes = [
  { path: '',             component: HomeComponent },
  { path: 'booking',      component: BookingComponent },
  { path: 'itinerary',    component: ItineraryComponent },
  { path: 'payment',      component: PaymentComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**',           redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

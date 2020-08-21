import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientComponent } from './pages/client/client.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'client/:id', component: ClientComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'clients' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

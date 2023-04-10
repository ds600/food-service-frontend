import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenusComponent } from './pages/menus/menus.component';
import { VoteComponent } from './pages/vote/vote.component';

const routes: Routes = [
  {
    path: 'menus',
    component: MenusComponent
  },
  {
    path: 'vote/:id',
    component: VoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

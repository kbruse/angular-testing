import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './core/components';


const routes: Routes = [
  {
    path: 'login',
    component: MainViewComponent,
  },
  {
    path: 'test-path',
    component: MainViewComponent
  },
  {
    path: '**',
    component: MainViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

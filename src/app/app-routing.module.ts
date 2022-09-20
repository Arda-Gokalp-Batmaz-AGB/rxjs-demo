import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { ProfileComponent } from './demo/profile/profile.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  { path: 'playground', component: PlaygroundComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'demo/profile/:id', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

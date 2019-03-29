import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UserEditComponent } from './components/user-edit.component';
import { CategoryListComponent } from './components/category-list.component';


const routes: Routes = [
	{path:'', component: CategoryListComponent},
	{path:'category/:page', component: CategoryListComponent},
	{path:'mis-datos', component: UserEditComponent},
	{path:'**', component: CategoryListComponent}
];

export const appRoutingProviders: any[] = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

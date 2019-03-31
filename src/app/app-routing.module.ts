import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UserEditComponent } from './components/user-edit.component';
import { MenuComponent } from './components/menu.component';
import { CategoryAddComponent } from './components/category-add.component';
import { CategoryEditComponent} from './components/category-edit.component';
import { HomeComponent } from './components/home.component';


const routes: Routes = [
	{path:'', component: HomeComponent},
	{path:'menu-category', component: MenuComponent},
	{path:'edit-category/:id', component: CategoryEditComponent},
	{path:'add-category', component: CategoryAddComponent},
	{path:'mis-datos', component: UserEditComponent},
	{path:'**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

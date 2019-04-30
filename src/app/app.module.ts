import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule} from './modules/material.module';
import { UserEditComponent } from './components/user-edit.component';
import { MenuComponent } from './components/menu.component';
import { MenuItemComponent } from './components/menu-item.component';
import { CategoryAddComponent } from './components/category-add.component';
import { CategoryEditComponent} from './components/category-edit.component';
import { ProductListComponent} from './components/product-list.component';
import { HomeComponent } from './components/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Ng5SliderModule } from 'ng5-slider';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { NavService } from './services/nav.service';


library.add(fas);



@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    MenuComponent,
    MenuItemComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ProductListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FontAwesomeModule,
    Ng5SliderModule
  ],
  providers: [appRoutingProviders, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }

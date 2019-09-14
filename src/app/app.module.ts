import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './shared/footer/footer.module';
import { HomeModule } from './content/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // @angular packages
    BrowserModule,
    FormsModule,
    HttpClientModule,

    // app packages
    AppRoutingModule,
    HomeModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

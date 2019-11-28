import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app/app-routing.module";
import { AppComponent } from "./app/app.component";
import { HeaderBarComponent } from "./app/header-bar/header-bar.component";
import { MatToolbarModule } from "@angular/material";

@NgModule({
  declarations: [AppComponent, HeaderBarComponent],
  imports: [BrowserModule, AppRoutingModule, MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

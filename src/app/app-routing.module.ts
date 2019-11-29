import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PanelComponent } from "./panel/panel.component";
import { AppComponent } from "./app.component";
import { EntryComponent } from "./entry/entry.component";
import { MainCanActiveGuard } from "../guards/main/active";

const routes: Routes = [
  { path: "", redirectTo: "/entry", pathMatch: "full" },
  { path: "entry", component: EntryComponent },
  {
    path: "main",
    component: PanelComponent,
    canActivate: [MainCanActiveGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

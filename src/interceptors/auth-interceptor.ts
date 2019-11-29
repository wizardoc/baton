import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UserService } from "src/services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.info("aaaaa");

    return next.handle(
      req.clone({
        headers: req.headers.set("Authentication", this.userService.token)
      })
    );
  }
}

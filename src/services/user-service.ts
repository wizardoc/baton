import { Injectable } from "@angular/core";
import { LoginPayload, CommonResponse } from "src/dtos";
import { HttpClient } from "@angular/common/http";
import { HttpInfo } from "./http-info";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private httpInfo: HttpInfo) {}

  get isLogin(): boolean {
    return !!this.token;
  }

  get token(): string | null {
    return localStorage.getItem("jwt");
  }

  login(data: LoginPayload) {
    return this.httpClient.post<CommonResponse<string>>(
      this.httpInfo.path("/account/login"),
      data
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/services/user-service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "login-card",
  templateUrl: "./login-card.component.html",
  styleUrls: ["./login-card.component.scss"]
})
export class LoginCardComponent implements OnInit {
  loginData = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    const result = this.userService.login(this.loginData.value);

    result.subscribe(
      ({ data }) => {
        localStorage.setItem("jwt", data);

        this.snackBar.open("登录成功!", undefined, {
          duration: 3000,
          panelClass: ["success-snackbar"]
        });
        this.router.navigate(["/main"]);
      },
      ({ status }) => {
        if (status === 401) {
          this.snackBar.open("账号密码错误!", undefined, {
            duration: 1000
          });
        }
      }
    );
  }
}

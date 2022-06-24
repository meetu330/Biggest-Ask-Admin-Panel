import { Component, Output ,  EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private http: HttpClient) {}

  error:any = ""
  errorStatus:any = ""
  test2 :any
  isLogin = true
  // @Output() profileName = new EventEmitter<any>();
  profileName : any

  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

  // send request
  onCreatePost(postData: { email: string; password: string }) {


  if(postData.email == ""){
    this.error = "Field Can't be Empty"
    this.errorStatus = true
  }else{
    this.error = ""
    this.errorStatus = false
  }
  if(postData.password == ""){
    this.error = "Field Can't be Empty"
    this.errorStatus = true
  }else{
    this.error = ""
    this.errorStatus = false
  }

  if(this.error == false) {
    this.http
    .post(
      'https://biggestaskbackend.justcodenow.com/api/check_login',
      postData
    )
    .subscribe(
      (res) => {
        if (res) {
          this.test2 = res;
          console.log(res);

          if (this.test2.status == 1) {
            localStorage.setItem("userId",this.test2.userId)
            localStorage.setItem("userName",this.test2.name)
            Swal.fire(
              'Good job!',
              'Login Succesfull!',
              'success'
            ).then(() => {
             window.location.href = "/questionbank"
            });
          }
          else {
            Swal.fire(
              'Login Failed!',
              'Check Email or Password!',
              'error'
            );
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  }



}

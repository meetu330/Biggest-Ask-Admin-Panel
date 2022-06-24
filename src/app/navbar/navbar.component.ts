import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  test:any
  user :any

  constructor(private http: HttpClient) {

  }

  ngOnInit() :void {
    // this.onCreatePost()
    this.user = localStorage.getItem('userName')
  }


  // onCreatePost() {
  //   this.http
  //     .get('https://biggestaskbackend.justcodenow.com/api/profile')
  //     .pipe(
  //       map((res: any) => {
  //         const postsArray = [];
  //         postsArray.push({ ...res });
  //         this.user = postsArray[0]['name'];
  //       })
  //     )
  //     .subscribe(
  //       (res) => {},
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }
  onLogout() {
    this.http
      .get('https://biggestaskbackend.justcodenow.com/api/logout')
      .subscribe(
        (res) => {
          if(res){
            this.test =  res
            if(this.test.status == 1){
              localStorage.removeItem("userId");
              Swal.fire(
                'Good job!',
                'You have beenLLogout!',
                'success'
              ).then(() => {
                window.location.href = "/";
              });
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

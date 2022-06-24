import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  constructor(private http: HttpClient) {}

  data: any;
  error: any = {
    name: '',
    email: '',
    insta: '',
    forum: '',
    bio: '',
  };
  status: any = false;
  errorPass: any = {
    old: '',
    new: '',
    confirmed: '',
  };
  statusPass: any = {
    old: false,
    new: false,
    confirm: false,
  };
  test: any;
  test2: any;
  imgs: any;
  image: any;

  onCreatePost() {
    this.http
      .get('https://biggestaskbackend.justcodenow.com/api/profile')
      .pipe(
        map((res: any) => {
          const postsArray = [];
          postsArray.push({ ...res });
          this.data = postsArray;
          this.imgs = this.data[0]['image'];
          localStorage.setItem('userName', this?.data[0]['name']);
        })
      )
      .subscribe((res: any) => {
        // console.log(res);
        // this.data = res.name;
      });
  }
  ngOnInit(): void {
    this.onCreatePost();
  }

  upload(e: any) {
    this.image = e.target.files[0]['name'];
  }

  onSubmit(profileForm: {
    email: any;
    name: any;
    forum: any;
    insta: any;
    bio: any;
    image: File;
  }) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'enctype':'multipart/form-data',
    //   })
    // }
    // const uploadData = new FormData();
    // uploadData.append('myFile', this.imageName, this.imageName);
    // profileForm.images = this.imageName
    // const fd = new FormData;
    // fd.append('image',this.image);
    console.log(profileForm);
    this.http
      .post(
        'https://biggestaskbackend.justcodenow.com/api/profile_update',
        profileForm
      )
      .subscribe(
        (res) => {
          if (res) {
            this.test2 = res;
            if (this.test2.status == 1) {
              Swal.fire(
                'Good job!',
                'Your Profile has been updated!',
                'success'
              ).then(() => {
                window.location.reload();
              });
            } else {
              Swal.fire(
                'Your Profile didnot updated!',
                'Please Try Again!',
                'error'
              );
            }
          }
        },
        (error) => {}
      );
  }

  changePassword(changePass: {
    old_password: any;
    new_password: any;
    confirm_password: any;
  }) {
    if (changePass.old_password == '') {
      this.errorPass.old = 'Field Required';
      this.statusPass.old = true;
    } else {
      this.errorPass.old = '';
      this.statusPass.old = false;
    }
    if (changePass.new_password == '') {
      this.errorPass.new = 'Field Required';
      this.statusPass.new = true;
    } else {
      this.errorPass.new = '';
      this.statusPass.new = false;
    }

    if (changePass.new_password != changePass.confirm_password) {
      this.errorPass.confirmed = 'Password dont match';
      this.statusPass.confirm = true;
    } else {
      this.errorPass.confirmed = '';
      this.statusPass.confirm = false;
    }

    if (
      this.statusPass.new == false &&
      this.statusPass.old == false &&
      this.statusPass.confirm == false
    ) {
      this.http
        .post(
          'https://biggestaskbackend.justcodenow.com/api/change_password',
          changePass
        )
        .subscribe(
          (res) => {
            if (res) {
              this.test = res;
              if (this.test.Status == 1) {
                // alert('done');
                Swal.fire(
                  'Good job!',
                  'Your Password has been changed!',
                  'success'
                ).then(() => {
                  window.location.reload();
                });
              } else {
                Swal.fire(
                  'Old Password dont match!',
                  'PLease Try Again!',
                  'error'
                );
              }
            }
          },
          (error) => {}
        );
    }
  }
}

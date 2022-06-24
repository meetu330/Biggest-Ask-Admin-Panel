import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent implements OnInit, AfterViewInit {
  journeyData: any = [];
  milestones: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = window.location.href;
    const url_split = url.split('/');
    const actual_url = url_split[4];
    this.journey(actual_url);
  }
  ngAfterViewInit(): void {
    let modal = document.querySelectorAll('.modal');
    document.addEventListener('click', (e: any) => {
      modal.forEach((curr: any) => {
        if (curr.classList.contains('show')) {
          curr.classList.remove('show');
          if(curr.id == 'exampleModalParent'){
            document.getElementById('parent')?.click()
          }
          if(curr.id == 'exampleModalPartner'){
            document.getElementById('partner')?.click()
          }
          if(curr.id == 'exampleModalSurrogate'){
            document.getElementById('surrogate')?.click()
          }
        }
      });
    });
  }
  journey(url: any) {
    this.http
      .get(
        `https://biggestaskbackend.justcodenow.com/api/journy_milestone/${url}`
      )
      .subscribe((res: any) => {
        this.journeyData = res;
        this.milestones = this.journeyData.milestone;
      });
  }
}

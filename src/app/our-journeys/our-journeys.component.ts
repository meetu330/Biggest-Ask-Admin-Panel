import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-journeys',
  templateUrl: './our-journeys.component.html',
  styleUrls: ['./our-journeys.component.css'],
})
export class OurJourneysComponent implements OnInit  {
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchJourney();
  }
  JourneyData: any = [];
  searchText: any;

  fetchJourney() {
    this.http
      .get('https://biggestaskbackend.justcodenow.com/api/get_journy')
      .subscribe(
        (res) => {
          this.JourneyData = res;
        },
        (error) => {}
      );
  }
}

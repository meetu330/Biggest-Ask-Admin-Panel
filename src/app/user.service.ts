import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({providedIn:'root'})
export class Services {
  data:any
  constructor(private http: HttpClient) {}
  editQuestionList(e: any) {
   return this.http
      .get(
        `https://biggestaskbackend.justcodenow.com/api/question_edit/${e.target.id}`
      )
  }
}

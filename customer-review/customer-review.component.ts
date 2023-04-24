import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
@Injectable({
  providedIn: 'root'
});

export class CustomerReviewComponent {
  customerName: string;
  review: string;

  constructor(private httpclient: HttpClient) {
    this.customerName = '';
    this.review = '';
  }
  rootURL = '/api';
  getUsers(){
    return this.httpclient.get(this.'http://localhost:4000/api/customer-review' +'/users')
    
  };

  submitReview() {
    const data = {
      customerName: this.customerName,
      review: this.review
    };
    this.httpclient.post('http://localhost:4000/api/customer-review', data).subscribe(() => {
      alert('Review submitted successfully!');
      this.customerName = '';
      this.review = '';
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<any> {
    return this.http.get('https://restaurant-dbapi.herokuapp.com/getcustomers');
   // return this.http.get(environment.apiURL + '/Customer');//.toPromise();
  }
}

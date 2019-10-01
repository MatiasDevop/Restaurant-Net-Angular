import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  formData: Order;
  orderItems:OrderItem[];

  constructor(private http:HttpClient) { }

  saveOrUpdateOrder(){

    var body={
      ...this.formData,
      OrderItems:this.orderItems
    };
    return this.http.post(environment.apiURL + '/Order', body);
  }
  getOrderList(): Observable<any> {
    return this.http.get(environment.apiURL + '/Order');//.toPromise();
  }
  getOrderByID(id:number): Observable<any> {
    return this.http.get(environment.apiURL + '/Order/' + id);//.toPromise();
  }
  deleteOrder(id:number){
    return this.http.delete(environment.apiURL + '/Order/' + id)
    .pipe(retry(1),
    catchError(this.errorHandl));
  }

   // Error handling
   errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}

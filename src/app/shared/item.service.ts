import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }
  getItemList(): Observable<any> {
    
    return this.http.get('https://restaurant-dbapi.herokuapp.com/getitems');
    //return this.http.get(environment.apiURL + '/item').toPromise();
  }
}

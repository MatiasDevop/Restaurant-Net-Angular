import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

  orderList: Order[]
  constructor(private service: OrderService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }
  refreshList(){
    this.service.getOrderList().subscribe(
      res => this.orderList = res as Order[]
    )
  }
  openForEdit(orderID:number){
    this.router.navigate(['order/edit/'+ orderID]);

  }
  onOrderDelete(id:number){
   // var index = index = this.orderList.map(x => {return x.OrderID}).indexOf(orderID);
    //console.log(index);
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteOrder(id).subscribe(res => {
        this.refreshList();
        this.toastr.warning("Deleted Successfully", "Restaurant App.");
      }
        //res => this.orderList.splice(index, 1)
      );
    }
   
  }

}

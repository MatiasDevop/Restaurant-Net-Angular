import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import{ MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from '../../shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { OrderService } from '../../shared/order.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData:OrderItem;
  itemList: Item[];
  isValid: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<OrderItemsComponent>,
    private itemService:ItemService,
    private orderService:OrderService) { 
      this.formData = new OrderItem();
    }

  ngOnInit() {
    this.itemService.getItemList().subscribe(res =>{
      this.itemList = res as Item[] });
   
    if (this.data.orderItemIndex == null ) {
      this.formData = {
        OrderItemID: null,
        OrderID:this.data.OrderID,
        ItemID:0,
        Name:'',
        Price:0,
        Quantity:0,
        Total:0
      };
    }else{
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
      this.formData.Total = this.formData.Quantity * this.formData.Price;
    }
    
  }
  updatePrice(ctrl){
    if (ctrl.selectedIndex == 0 ) {
      this.formData.Price = 0;
      this.formData.Name ='';

    }
    else{
      this.formData.Price = this.itemList[ctrl.selectedIndex-1].Price;
      this.formData.Name = this.itemList[ctrl.selectedIndex-1].Name;
    }
    this.updateTotal();
  }
  updateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2))
  }
  onSubmit(form: NgForm){
    if (this.validateForm(form.value)){
      console.log(form.value);
      if(this.data.orderItemIndex == null ){ 

        this.orderService.orderItems.push(form.value);
       
      }else{
        this.orderService.orderItems[this.data.orderItemIndex]= form.value;
      }
     
      this.dialogRef.close(false);
    }
    
  }
  validateForm(formData:OrderItem) {
    this.isValid = true;
    if(formData.ItemID == 0)
      this.isValid = false;
    else if(formData.Quantity == 0)
      this.isValid = false;
    return this.isValid;

  }
  onNoClick(): void {
    this.dialogRef.close(true);
  }

}

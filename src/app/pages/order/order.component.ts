import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ToastrService } from 'ngx-toastr';
import { OrderPost } from 'src/app/modules/shared/interfaces/order-post.interface';
import { MenusService } from 'src/app/modules/shared/services/menus.service';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor(
    private route: ActivatedRoute,
    private menusService: MenusService, 
    private toastr: ToastrService
    ) {}

  @ViewChild('navigation') navigation!: NgImageSliderComponent;
  imageObject: Array<object> = [];
  hoveringCard: boolean = false;
  loading = false;
  paramId: string = '';

  form: FormGroup = new FormGroup<{ orderNumber: FormControl; additionInformation: FormControl; price: FormControl }>({
    orderNumber: new FormControl('', [Validators.required]),
    additionInformation: new FormControl(''),
    price: new FormControl('', [Validators.required]),
  });;

  async ngOnInit(): Promise<void> {
    this.paramId = this.route.snapshot.params['id'];
    let menus: string[] = await this.menusService.getCurrentMenuPages();
    
    menus.forEach(menuLocation => {
      this.imageObject.push(
        {
          image: menuLocation,
          thumbImage: menuLocation,
          alt: 'Image Alt 1',
        }
      )
    });
  }

  async order(): Promise<void>  {
    if (this.form.value.orderNumber === "" || this.form.value.price === "") {
      this.toastr.error("Please enter your order and its price", "Can't send order", {
        timeOut: 3000,
      });
      return;
    } 

    let order: OrderPost = new OrderPost;
    order.token = this.paramId;
    order.additionInformation = this.form.value.additionInformation;
    order.orderNumber = this.form.value.orderNumber;
    order.price = this.form.value.price;
    this.loading = true;
    try {
      await this.menusService.postOrder(order);
      this.loading = false;
    }
    catch(err) {
      this.loading = false;
    }
  }
}

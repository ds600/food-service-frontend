import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../interfaces/api-response.interface';
import { VoteOptions } from '../interfaces/vote-options.interface';
import { VotePost } from '../interfaces/vote-post-interface';
import { OrderPost } from '../interfaces/order-post.interface';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  constructor(private httpClient: HttpClient, public toastr: ToastrService) {}

    /**
     * We're using the Angular HttpClient to make a GET request to the server
     */
    getAllMenuPages(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this.httpClient.get('/api/allmenus').subscribe({
              next: response => {
                let apiResponse = response as ApiResponse;

                resolve(JSON.parse(apiResponse.ResponseObject));
              },
              error: error => {
                let apiError = error as HttpErrorResponse;
                this.toastr.error(apiError.message, 'Getting Menus Failed', {
                    timeOut: 3000,
                });
                reject(apiError);
              },
            });
        });
    }

    /**
    * We're using the Angular HttpClient to make a GET request to the server
    */
    getCurrentMenuPages(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this.httpClient.get('/api/currentMenu').subscribe({
                next: response => {
                let apiResponse = response as ApiResponse;

                resolve(JSON.parse(apiResponse.ResponseObject));
                },
                error: error => {
                let apiError = error as HttpErrorResponse;
                this.toastr.error(apiError.message, 'Getting Menus Failed', {
                    timeOut: 3000,
                });
                reject(apiError);
                },
            });
        });
    }

    /**
    * We're using the Angular HttpClient to make a Post request to the server, sending our vote in
    */
    postOrder(order: OrderPost): Promise<any> {
      return new Promise<any>((resolve, reject) => {
          this.httpClient.post<ApiResponse>('api/sendorder', order).subscribe({
              next: (response: ApiResponse) => {
                  this.toastr.success("SUCCESS", 'Your Order has been registered, thank you for ordering!', {
                      timeOut: 3000,
                  });
                  resolve(response.ResponseObject);
              },
              error: (err: HttpErrorResponse) => {
                  this.toastr.error(err.message, 'Sending your order in failed, please try again', {
                      timeOut: 3000,
                  });
                  reject(err);
              },
          });
      });
  }
}

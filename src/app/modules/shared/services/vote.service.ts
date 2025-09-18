import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ToastService, ToastType } from '@lenne.tech/ng-base/shared';
import { ApiResponse } from '../interfaces/api-response.interface';
import { VoteOptions } from '../interfaces/vote-options.interface';
import { VotePost } from '../interfaces/vote-post-interface';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private httpClient: HttpClient, public toastr: ToastService) {}

    /**
     * We're using the Angular HttpClient to make a GET request to the server, and then we're mapping the response to a VoteOptions object
     */
    getVoteOptions(): Promise<VoteOptions> {
        return new Promise<VoteOptions>((resolve, reject) => {
            this.httpClient.get('/api/voteoptions').subscribe({
              next: response => {
                let apiResponse = response as ApiResponse;

                // Map result object to our voteOptions class
                let resultObject: any = JSON.parse(apiResponse.ResponseObject) as VoteOptions;
                let result: VoteOptions = {} as VoteOptions;
                result.lastVoteWinner = resultObject.LastVoteWinner;
                result.options = resultObject.Options;
                resolve(result);
              },
              error: error => {
                let apiError = error as HttpErrorResponse;
                this.toastr.show(
                  {
                  id: 'get-vote-options-error',
                  type: ToastType.ERROR,
                  title: apiError.message,
                  description: 'Getting Vote Options Failed',
                  },
                  3000
                );
                reject(apiError);
              },
            });
        });
    }

    /**
    * We're using the Angular HttpClient to make a Post request to the server, sending our vote in
    */
    postVote(vote: VotePost): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.httpClient.post<ApiResponse>('api/sendvote', vote).subscribe({
                next: (response: ApiResponse) => {
                    this.toastr.show(
                        {
                        id: 'vote-success',
                        type: ToastType.SUCCESS,
                        title: 'SUCCESS',
                        description: 'Your vote has been registered, thank you for voting!',
                        },
                        3000
                    );
                    resolve(response.ResponseObject);
                },
                error: (err: HttpErrorResponse) => {
                    this.toastr.show(
                        {
                        id: 'vote-error',
                        type: ToastType.ERROR,
                        title: err.message,
                        description: 'Sending your vote in failed, please try again',
                        },
                        3000
                    );
                    reject(err);
                },
            });
        });
    }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../interfaces/api-response.interface';
import { VoteOptions } from '../interfaces/vote-options.interface';
import { VotePost } from '../interfaces/vote-post-interface';

@Injectable({
  providedIn: 'root',
})
export class VotenService {
  constructor(private httpClient: HttpClient, public toastr: ToastrService) {}

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
                this.toastr.error(apiError.message, 'Getting Vote Options Failed', {
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
    postVote(vote: VotePost): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.httpClient.post<ApiResponse>('api/vote', vote).subscribe({
                next: (response: ApiResponse) => {
                    this.toastr.success("SUCCESS", 'Your vote has been registered, thank you for voting!', {
                        timeOut: 3000,
                    });
                    resolve(response.ResponseObject);
                },
                error: (err: HttpErrorResponse) => {
                    this.toastr.error(err.message, 'Sending your vote in failed, please try again', {
                        timeOut: 3000,
                    });
                    reject(err);
                },
            });
        });
    }

}

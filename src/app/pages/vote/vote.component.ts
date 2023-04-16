import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VoteOptions } from 'src/app/modules/shared/interfaces/vote-options.interface';
import { VotePost } from 'src/app/modules/shared/interfaces/vote-post-interface';
import { VoteService } from 'src/app/modules/shared/services/vote.service';

@Component({
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  @Input() selectedVote: string = "";
  paramId: string = '';
  voteoptions: VoteOptions = {} as VoteOptions;
  loading = false;


  constructor(
    private route: ActivatedRoute,
    private voteService: VoteService, 
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.paramId = this.route.snapshot.params['id'];
    this.voteoptions = await this.voteService.getVoteOptions();
  }

  createPaddingValue(): string {
    let paddingValue = this.getVotePaddingTop() + " " + this.getOtherVotePaddings();
    return paddingValue;
  }

  async vote(): Promise<void> {
    if (!this.selectedVote || this.selectedVote == "") {
      this.toastr.error("Can not send vote", 'Please select a vote option', {
        timeOut: 3000,
      });
      return;
    }
    
    let votePost: VotePost = new VotePost;
    votePost.userId = this.paramId;
    votePost.voteResult = this.selectedVote;

    this.loading = true;

    try {
      await this.voteService.postVote(votePost);
      this.loading = false;
    }
    catch(err) {
      this.loading = false;
    }
  }

  getVotePaddingTop(): string {
    if (this.voteoptions.options) {
      let padding = 90 + 7 * this.voteoptions.options.length;
      return padding + "px";
    }
    else {
      return "90px";
    }
  }

  getOtherVotePaddings(): string {
    if (this.voteoptions.options) {
      let padding = 20 + 7 * this.voteoptions.options.length;
      let returnPadding = "";
      for (let i = 0; i < 3; i++) {
        returnPadding += padding.toString() + "px ";
      }
  
      return returnPadding;
    }
    else {
      return "20px 20px 20px";
    }

  }
}

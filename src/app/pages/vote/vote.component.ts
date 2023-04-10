import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VoteOptions } from 'src/app/modules/shared/interfaces/vote-options.interface';
import { VotenService } from 'src/app/modules/shared/services/vote.service';

@Component({
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  paramId: string = '';
  voteoptions: VoteOptions = {} as VoteOptions;
  loading = false;


  constructor(
    private route: ActivatedRoute,
    private voteService: VotenService
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

import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { MenusService } from 'src/app/modules/shared/services/menus.service';

@Component({
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit{
  constructor(
    private menusService: MenusService,
    ) {}

  @ViewChild('navigation') navigation!: NgImageSliderComponent;
  imageObject: Array<object> = [];
  hoveringCard: boolean = false;

  scale = 1;
  panning = false;
  pointX = 0;
  pointY = 0;
  start = { x: 0, y: 0 };
  zoom = document.getElementById("zoom");

  async ngOnInit(): Promise<void> {
    let menus: string[] = await this.menusService.getAllMenuPages();
    
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

}

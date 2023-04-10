import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface MenuItem {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title!: string;
  @Input() settingsRoute!: string;
  @Input() icon!: string;
  @Input() iconSize = '18';
  @Input() menu!: MenuItem[];

  menuOpened = false;

  @Output() menuItemClicked = new EventEmitter<string>();
  @Output() iconClicked = new EventEmitter<boolean>();
}

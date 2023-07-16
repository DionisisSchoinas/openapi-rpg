import { Component, Input } from '@angular/core';
import { PageData } from './page-data';
import { Role } from './role';

@Component({
  selector: 'tr[page-data]',
  templateUrl: './page-data.component.html',
  styleUrls: ['./page-data.component.css']
})
export class PageDataComponent {
  @Input()
  page: PageData = { role: Role.NONE, content: '' };
}

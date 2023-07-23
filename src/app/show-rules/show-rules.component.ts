import { Component, Input, OnInit } from '@angular/core';
import { ShowRulesService } from './show-rules.service';

@Component({
  selector: 'show-rules',
  templateUrl: './show-rules.component.html',
  styleUrls: ['./show-rules.component.css']
})
export class ShowRulesComponent implements OnInit {
  @Input() 
  rules: string = "";

  constructor(private showRulesService: ShowRulesService) { }

  ngOnInit(): void {
      this.showRulesService.rules$.subscribe((rules) => this.rules = rules.content);
  }

  requestRules() {
    this.showRulesService.requestRules();
  }
}

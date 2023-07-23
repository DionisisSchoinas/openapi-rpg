import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageData } from '../page-data/page-data';
import { Role } from '../page-data/role';

@Injectable({
  providedIn: 'root'
})
export class ShowRulesService {

  private requestRulesBus$ = new BehaviorSubject<boolean>(false);
  requestRules$ = this.requestRulesBus$.asObservable();

  private rulesBus$ = new BehaviorSubject<PageData>({ role: Role.NONE, content: "", can_rollback: false });
  rules$ = this.rulesBus$.asObservable();

  constructor() { }

  requestRules() {
    this.requestRulesBus$.next(true);
  }

  sendBackRules(rules: PageData) {
    this.requestRulesBus$.next(false);
    this.rulesBus$.next(rules);
  }
}

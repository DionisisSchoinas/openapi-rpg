import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiRequesterService } from '../api-requester/api-requester.service';
import { FileSaverService } from '../file-saver/file-saver.service';
import { PageData } from '../page-data/page-data';
import { Role } from '../page-data/role';
import { GameResetService } from '../game-reset/game-reset.service';
import { ShowRulesService } from '../show-rules/show-rules.service';
import { LoadingDialogService } from '../loading-dialog/loading-dialog.service';


@Component({
  selector: 'game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent implements OnInit, AfterViewChecked {

  @ViewChild('dialogBox')
  private myScrollContainer!: ElementRef;

  pages: PageData[] = [];

  constructor(
    private http: HttpClient,
    private apiRequesterService: ApiRequesterService,
    private fileSaverService: FileSaverService,
    private gameResetService: GameResetService,
    private showRulesService: ShowRulesService,
    private loadingDialogService: LoadingDialogService) { }

  ngOnInit() {
    this.loadDefault();
    // Handle API responses and save loading
    this.apiRequesterService.currentData.subscribe(data => {
      if (data == null || data == undefined || data.role == Role.NONE)
        return;
      if (data.role == Role.ERROR) {
        if (this.pages[this.pages.length - 1].role == Role.USER)
          this.pages = this.pages.slice(0, this.pages.length - 1);
        return;
      }

      if (data.role == Role.SYSTEM)
        this.pages = [];
      this.pages.push(data);
    });
    // Handle game save
    this.fileSaverService.requestData$.subscribe(data => {
      if (data) {
        this.fileSaverService.saveData(this.pages);
      }
    });
    // Handle game reset
    this.gameResetService.requestReset$.subscribe(data => {
      if (data) {
        this.pages = this.pages.slice(0, 1);
        this.gameResetService.gameHasBeenReset();
      }
    });
    // handle rules displaying
    this.showRulesService.requestRules$.subscribe(data => {
      if (data) {
        this.showRulesService.sendBackRules(this.pages[0]);
      }
    });
  }

  ngAfterViewChecked() {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log(err);
    }
  }

  sendUserInput(text: string) {
    if (text == null || text.trim().length == 0 || text.trim().length > 256)
      return;

    this.pages.push({ role: Role.USER, content: text.trim(), date: new Date() });
    this.apiRequesterService.newUserInput(this.pages);
  }

  displayablePages() {
    return this.pages.filter(page => page.role == Role.USER || page.role == Role.ASSISTANT);
  }

  rollbackTo(index: number) {
    if (index < 0 || index >= this.pages.length - 1)
      return;
    this.pages = this.pages.slice(0, index + 1);
  }

  rollbackIsAllowed(page: PageData): boolean {
    if (page.role == Role.ASSISTANT)
      return true;
    return false;
  }

  testLoad() {
    throw new Error("Test error");
  }

  private loadDefault() {
    this.http.get('../../assets/default_rules/rules.txt', { responseType: 'text' })
      .subscribe(
        {
          next: (data) => {
            this.pages.push({ role: Role.SYSTEM, content: data, date: new Date() });
          },
          error: (e) => {
            console.error(e);
            throw new Error("Could not load default rules!");
          }
        }
      );
    return;
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { GameDisplayComponent } from './game-display/game-display.component';
import { PageDataComponent } from './page-data/page-data.component';
import { FileSaverComponent } from './file-saver/file-saver.component';
import { GameResetComponent } from './game-reset/game-reset.component';
import { ShowRulesComponent } from './show-rules/show-rules.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    GameDisplayComponent,
    PageDataComponent,
    FileSaverComponent,
    GameResetComponent,
    ShowRulesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

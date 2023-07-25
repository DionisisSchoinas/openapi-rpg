import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FileSaverComponent } from './file-saver/file-saver.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { GameResetComponent } from './game-reset/game-reset.component';
import { PageDataComponent } from './page-data/page-data.component';
import { ShowRulesComponent } from './show-rules/show-rules.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    GameDisplayComponent,
    PageDataComponent,
    FileSaverComponent,
    GameResetComponent,
    ShowRulesComponent,
    ErrorDialogComponent,
    LoadingDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

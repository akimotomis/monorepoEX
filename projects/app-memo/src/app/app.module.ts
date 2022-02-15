import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { MaterialModule } from 'lib-memo';
import { AppComponent } from './app.component';
import { LibMemoModule } from 'lib-memo';
import { TaskModule } from './task/task.module';
import { MemoModule } from './memo/memo.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MaterialModule,
    LibMemoModule,
    TaskModule,
    MemoModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

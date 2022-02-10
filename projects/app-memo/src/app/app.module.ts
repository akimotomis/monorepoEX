import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MaterialModule } from 'lib-memo';
import { AppComponent } from './app.component';
import { TaskModule } from './task/task.module';
import { LibMemoModule } from 'lib-memo';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // MaterialModule,
    LibMemoModule,
    TaskModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

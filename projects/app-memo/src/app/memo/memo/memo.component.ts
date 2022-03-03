import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit, AfterViewInit {
  // properties
  public apiHost: string = '';

  constructor() {}

  ngOnInit(): void {
    this.apiHost = environment.apihost;
    console.log('MemoComponent:ngOnInit (apiHost)' + this.apiHost);
  }

  ngAfterViewInit(): void {
    console.log('MemoComponent:ngAfterViewInit');
  }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {
    console.log('MemoComponent:ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('MemoComponent:ngAfterViewInit');
  }
}

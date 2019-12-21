import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './app-text-field.component.html',
  styleUrls: ['./app-text-field.component.scss'],
})
export class AppTextFieldComponent implements OnInit {

  @ViewChild('deaths', { static: true }) deaths: ElementRef;

  @Input() label = '';
  @Input() hint = '';
  @Input() enterdValue = '';

  constructor() { }

  ngOnInit() {
  }

}

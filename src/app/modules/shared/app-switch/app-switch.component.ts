import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './app-switch.component.html',
  styleUrls: ['./app-switch.component.scss']
})
export class AppSwitchComponent implements OnInit {

  @Input() text: string;
  @Input() checked = false;

  constructor() { }

  ngOnInit() {
  }

}

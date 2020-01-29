import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Switch } from 'tns-core-modules/ui/switch/switch';
import { Color } from 'tns-core-modules/color/color';
import { isAndroid } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'app-switch',
  templateUrl: './app-switch.component.html',
  styleUrls: ['./app-switch.component.scss']
})
export class AppSwitchComponent implements OnInit {

  @ViewChild('switch', { static: true }) switch: ElementRef;

  @Input() text: string;
  @Input() checked = true;

  @Output() checkChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onCheckedChange(args: Switch) {
    this.checkChanged.emit(args.checked);
    // if (isAndroid) {
    //   setTimeout(() => {
    //     if (args.checked) {
    //       this.switch.nativeElement.color = new Color('#76D572');
    //       this.switch.nativeElement.backgroundColor = new Color('#76D572');
    //     } else {
    //       this.switch.nativeElement.color = undefined;
    //       this.switch.nativeElement.backgroundColor = undefined;
    //     }
    //   }, 100);
    // }
  }
}

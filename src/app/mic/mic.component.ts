import { Component, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-mic-waves',
  templateUrl: './mic.component.html',
  styleUrls: ['./mic.component.scss']
})
export class MicComponent {
  @Input() isMicActive: boolean = false;
  

}

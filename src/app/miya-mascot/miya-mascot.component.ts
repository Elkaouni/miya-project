import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-miya-mascot',
  templateUrl: './miya-mascot.component.html',
  styleUrls: ['./miya-mascot.component.scss']
})
export class MiyaMascotComponent implements OnChanges {
  @Input() miya_state : string = "sleeping.png"
  src : string = "../../assets/mascot/"+this.miya_state

  ngOnChanges(changes: SimpleChanges): void {
    this.src = "../../assets/mascot/" + this.miya_state;
  }

}

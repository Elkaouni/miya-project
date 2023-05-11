import { Component } from '@angular/core';

const sleeping = "sleeping.png"
const wokeUp = "wokeUp.png"
const awake = "awake.png"
const happy = "happy.png"
const angry = "angry.png"
const crying = "crying.png"
const cold = "cold.png"
const wake_miya = "Wake Miya up"
const bye_miya = "Put Miya to sleep"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'miya-front-poc';
  miya_state : string = sleeping
  button_title : string = wake_miya;
  
  wakeMiyaUp(){
    if( this.miya_state == sleeping ) {
      this.miya_state = wokeUp;
      console.log("Miya is now "+ wokeUp);
      setTimeout(() => {
        this.miya_state = awake ;
        console.log("Miya is now "+ awake);
        this.button_title = bye_miya
      }, 500);
    }
    else{
      this.miya_state = cold;
      console.log("Miya is now "+ cold);
      setTimeout(() => {
        this.miya_state = sleeping ;
        console.log("Miya is now "+ sleeping);
        this.button_title = wake_miya
      }, 500);
    }
  }
  
}

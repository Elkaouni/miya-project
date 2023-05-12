import { Component } from '@angular/core';
import { saveAs } from 'file-saver';


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

  isMicActive: boolean = false;
  mediaRecorder: MediaRecorder | null = null;
  chunks: Blob[] = [];
  
  wakeMiyaUp(){
    if( this.miya_state == sleeping ) {
      this.miya_state = wokeUp;
      console.log("Miya is now "+ wokeUp);
      setTimeout(() => {
        this.miya_state = awake ;
        console.log("Miya is now "+ awake);
        this.activateMic()
        this.button_title = bye_miya
      }, 500);
    }
    else{
      this.miya_state = cold;
      console.log("Miya is now "+ cold);
      this.activateMic()
      setTimeout(() => {
        this.miya_state = sleeping ;
        console.log("Miya is now "+ sleeping);
        this.button_title = wake_miya
      }, 500);
    }
  }

  async activateMic() {
    try {
      this.isMicActive = !this.isMicActive;
      if (this.isMicActive) {
        this.mediaRecorder = await this.startRecording();
      } else {
        this.stopRecording();
      }
    } catch (error) {
      console.error('Failed to activate the microphone:', error);
    }
  }

  async startRecording(): Promise<MediaRecorder> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data);
      }
    });
    mediaRecorder.start();
    return mediaRecorder;
  }
  
  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
      const audioBlob = new Blob(this.chunks, { type: 'audio/wav' });
      //this.saveAudioFile(audioBlob);
      this.chunks = [];
    }
  }
  
  saveAudioFile(blob: Blob) {
    const file = new File([blob], 'recording.wav', { type: 'audio/wav' });
    saveAs(file, 'miya-front-poc/src/assets/tmp/recording.wav');
    // Save the file or perform any other required operations
    console.log('Audio file saved:', file);
  }

}

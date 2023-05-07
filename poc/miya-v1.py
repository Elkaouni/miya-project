import sys

import io
from pydub import AudioSegment
import speech_recognition as sr
import whisper
import queue
import tempfile
import os
import threading
import click
import torch
import numpy as np
import torch
import pyttsx3

import gpt4free
from gpt4free import Provider

nlp_on = True

def generate_response_gpt4free(prompt):
    response =  gpt4free.Completion.create(Provider.You, prompt=prompt)
    return response


def speak_text(text):
    # Say the tex
    engine = pyttsx3.init()
    # Set the properties (rate, volume, voice)
    engine.setProperty('rate', 150)
    engine.setProperty('volume', 0.7)
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[1].id)
    engine.say(text)
    engine.runAndWait()


@click.command()
@click.option("--model", default="base", help="Model to use", type=click.Choice(["tiny","base", "small","medium","large"]))
@click.option("--english", default=False, help="Whether to use English model",is_flag=True, type=bool)
@click.option("--verbose", default=False, help="Whether to print verbose output", is_flag=True,type=bool)
@click.option("--energy", default=300, help="Energy level for mic to detect", type=int)
@click.option("--dynamic_energy", default=False,is_flag=True, help="Flag to enable dynamic engergy", type=bool)
@click.option("--pause", default=0.8, help="Pause time before entry ends", type=float)
@click.option("--save_file",default=False, help="Flag to save file", is_flag=True,type=bool)


def main(model, english,verbose, energy, pause,dynamic_energy,save_file):
    temp_dir = tempfile.mkdtemp() if save_file else None
    audio_model = whisper.load_model(model)
    audio_queue = queue.Queue()
    result_queue = queue.Queue()
    threading.Thread(target=record_audio,
                     args=(audio_queue, audio_model, energy, pause, 
                           dynamic_energy, save_file, temp_dir,
                           result_queue, english, verbose)).start()
    while True:
        print(result_queue.get())

def record_audio(audio_queue, audio_model, energy, pause, dynamic_energy, save_file, temp_dir, result_queue, english, verbose):
    print("inside record_audio")
    miya_called=False
    #load the speech recognizer and set the initial energy threshold and pause threshold
    r = sr.Recognizer()
    r.energy_threshold = energy
    r.pause_threshold = pause
    r.dynamic_energy_threshold = dynamic_energy

    if not miya_called:
        # Instruct the user to say MIYA to start recording
        miya_response= "....... ( Call Miya to wake her up.)"
        print("[ MIYA ]:  "+ miya_response)
        speak_text(miya_response)
    else:
        miya_response= "What is it master?"
        print("[ MIYA ]:  "+ miya_response)
        speak_text(miya_response)
    with sr.Microphone(sample_rate=16000) as source:
        i = 0
        while True:
            #get and save audio to wav file
            try:
                print("------ Trying again " + str(i))
                audio = r.listen(source)
                if save_file:
                    data = io.BytesIO(audio.get_wav_data())
                    audio_clip = AudioSegment.from_file(data)
                    filename = os.path.join(temp_dir, f"temp{i}.wav")
                    audio_clip.export(filename, format="wav")
                    audio_data = filename
                else:
                    torch_audio = torch.from_numpy(np.frombuffer(audio.get_raw_data(), np.int16).flatten().astype(np.float32) / 32768.0)
                    audio_data = torch_audio

                audio_queue.put_nowait(audio_data)

                if english:
                    result = audio_model.transcribe(audio_data,language='english')
                else:
                    result = audio_model.transcribe(audio_data)

                if not verbose:
                    predicted_text = result["text"]
                    result_queue.put_nowait("[ You ] : " + predicted_text)
                    #result_queue.put_nowait("---- Language: " + result["language"])

                    if not miya_called and ( "miya" in predicted_text.lower() or "mia" in predicted_text.lower()):
                        #wake miya up
                        miya_called = True
                        miya_response = "Welcome Master! I'm Miya! I'm now awake and listening!"
                        result_queue.put_nowait("[ MIYA ]:  "+ miya_response)
                        speak_text(miya_response)

                        miya_response = "What is it master? Ask me."
                        result_queue.put_nowait("[ MIYA ]:  "+ miya_response)
                        speak_text(miya_response)
                        # generate answer

                    elif not miya_called:
                        # Instruct the user to say MIYA to start recording
                        miya_response= "....... ( Miya is asleep.)"
                        result_queue.put_nowait("[ MIYA ]:  "+ miya_response)
                        speak_text(miya_response)


                    elif( "exit" in predicted_text.lower() or "bye" in predicted_text.lower() ):
                        miya_called = False
                        miya_response= "Bye bye! Miya... will... go back to sleep..."
                        result_queue.put_nowait("[ MIYA ]:  "+ miya_response)
                        speak_text(miya_response)
                        # exit the program with a success status code (0)
                        sys.exit(0)

                    elif( "miya." in predicted_text.lower() or "mia" in predicted_text.lower() ):
                        miya_response = "You called me master?"
                        result_queue.put_nowait("[ MIYA ]:  "+ miya_response)
                        speak_text(miya_response)
                        # generatee answer

                    else:
                        #generate respone using gpt4free
                        miya_response= "One sec. ( Lemme think...)"
                        result_queue.put_nowait("[ MIYA ]:  "+ miya_response)
                        speak_text(miya_response)
                        if nlp_on :
                            try:
                                response = generate_response_gpt4free(predicted_text)
                            except:
                                miya_response= "Sorry! I think there's a problem."
                                result_queue.put_nowait("[ MIYA ]:  "+ miya_response)
                                speak_text(miya_response)
                        else:
                            response = "I'm sorry, my brain is turned off right now"
                        result_queue.put_nowait("[ MIYA ]:  "+ response)

                        #read response using text to speech
                        speak_text(response)

                else:
                    result_queue.put_nowait(result)

                if save_file:
                    os.remove(audio_data)
            

                i += 1
            except Exception as e:
                print("An error occured: {}", format(e))
                miya_response= "Eh? Again please."
                print("[ MIYA ]:  "+ miya_response)
                speak_text(miya_response)
                sys.exit(-1)

main()

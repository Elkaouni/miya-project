# MIYA: My Intelligent Assistant

After the release of gpt4 that was marked the debut of some revolutionary apis and plugins, it became clear that my dream of having my own Jarvis like Iron-man did was becoming more real. A few days later, as i was still searching up how to make my own proof-of-concept jarvis, someone beat me to the race and realeased a demo of gpt4 + autogpt + siri buidling a simple webpage. That was the extra water drop.

So i promised myself to start my poc ASAP... using only free open source solutions. Ps: I in no way am a machine learning expert. I know the theory, i understand the simple code... full stop.

Let's get started with introducing the poc first.

<br>

## 1. Proof Of Concept

One word: Python.

The poc was simple: build a simple python script that listens to the mic, transforms speech to text, passes it as a prompt to a nlp model like gpt to generate a response and then read it outloud.

<br>

### **------ 1.1. Tools**

#### **1.1.1. Python:** 
It's basically Thanos of machine learning and anything related to models and model training.

#### **1.1.2. Anaconda:**
I created a virtual image there and used the conda terminal. I did try using the jupyter notebook at first when i was still testing and discovering how i wanna build my code since i could see the output of each function i executed. However I encountered a lot of problems python dependencies wise and also a few other problems. Creating a virtual image in anaconda and dowloading all the python libraries there i needed then just executing my script in it was the best move.

#### **1.1.3. VSCode:** 
Can't write code unless there. 

<br>

### **------ 1.2. Models**
Since it's only a proof of concept project, i opted for open source solutions:

#### **1.2.1. Whisper API**
Openai's speach to text model available through api. It recognises multiple languages (I uused my multilingual skills) and can also comprehend "Ah"s, "Eeh"s and "Umm"s, which was really cool.

It can also be used for translation. A nice feature to keep in mind

#### **1.2.2. GPT Model**
This was the hardest part in the whole project: finding a nice fast gpt model to generate an answer without encountering charges. I couldn't use openai's api since m free tokens were gone before i was even aware of time limit. I tried creating a new account with a new phone number but I couldn't benefit from the free tokens again.

During my search for a smart nlp model comparable to gpt, I found out about **Dolly 2.0** that uses an original dataset. It was nice but it was SO SLOW at generating a response when i downloaded the 3b model locally. Understandable, machine learning isn't CPU friendly and my GPU is small. Had to switch.

Thankfully, youtube recommended me a great github project called **GPT4All**, a fast cpu friendly model.

However, just 2 days later i found the greatest repo of all: **GPT4Free**. I leave you to read the documentation.

#### **1.2.3. TTS Model**
Since it's only a poc, i used the pyttsx python library. I am planning to have a better voice in the future. In my research, I found the **tortoise** and it was fun to play with and try generating a voice close to mine. I could see it'll be very chhallenging to make a voice with limited computing resources.

<br>

### **------ 1.3. Python Script**
The script itself is self explanitory and has a lot of comments showing my attempts and what I basically did.

<br>

#### **1.3.1. Preparations**
Before running the script, open a conda terminal and create a new virtual image:
```shell
conda create --name miyav1
```

You may precise the python version if you want to (i didn't when i was working):
```shell
conda create --name miyav1 python=3.10
```

Once the environment is created, activate it by running the following command:
```shell
conda activate miyav1
```

Then start pip installing all the libraries needed. I wrote them down in the "requirements.txt" file. You can either pip install each one of themm manually or execute:
```python
pip3 install -r requirements.txt
```
<br>

#### ***!!! ATTENTTION !!!***
If you have an antivirus and you have strict network settings, you may encounter SSL-Certificate errors while trying to download the libraries so I recommend either :
- adding these hostnames too your antivirus' trusted domain list:
    - pypi.org
    - files.pythonhosted.org
    - (i forgot the 3rd one)
- manually adding the hosts in your python command by adding ``` --trusted-host [[name of the domain]] ``` for each host.


<br><br>

<br>

#### **1.3.2. Executing the script**
Miya POC done.
```shell
python poc/miya-v1.py
```

Time fo the next step: setting up a web app. 

## 2. Choose: Mobile or Web app?
I was going at first with a mobile app. However it seems python and andrroid studio aren't exacly on friendly terms so after a few fails and lots of reflection (also thanks to my discussions with dad), I went with a web application.

## 3. Miya Web App POC
### **Technologies**
I thought first of using my favorite combo Angular x Spring boot. However thinking of how to integrate my python script and models with Java had me perplexed. The i remembered: many people love python --> there's gotta be a framework then.

- **Django**: a python framewoek i'll be using in my backend and create my rest APIs.
- **Angular**: i can always use more practice.
- **VSCode**: Naturally my IDE of choice
- **Docker**: I decided to replace the anaconda virtual image i used to run my script in with a docker image.

Since this is only a poc project, I haven't added a database. However, I did think about it and I' think I'll use a NoSQL database.

By the way, the front and back end projects will each have their own readme file summerizing n general the versions or steps I went through as a way to keep track of my path. They won't be as detailed as this file.

## 4. Future plans

- Slowly integrate Siri-like functions ("Hey mia, create a new file", "Add an alarm", ...).
- Better personalized text to speech model. I definitly hate the default robotic dead voice.
- Fine-tune the nlp model to shape the personality of the model and be able to generate the responses in the format i want.
- Add internet access to the nlp model to be able to look up things in google

I'm thinking of prioritising the first 2 points as they are crusial to the true essence of the Jarvis i want to make. 

The 3rd point is also important, however it's can wait. Having Miya respond in a robotic way isn't very problematic in the first versions. It is also an issue closely related to what model I'm using to generate the responses.

The 4rth point is an added feature.





<br> <br> <br> <br> 

## Webography
- GPT4All: https://github.com/nomic-ai/gpt4all
- GPT4Free: https://github.com/xtekky/gpt4free
- Miya:
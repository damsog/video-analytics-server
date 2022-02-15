# VideoAnalytics_Server

#### Backend system that serves a list of endpoints to connect and control a python  engine that allows to run live face detection and face recognition (or to do it by single image) And using said algorithms offers other more specific solutions to the user.

### Installation
###### Start by installing Nodejs, Mysql.
###### Create a mysql user and grant it priivileges.
###### Create a Database
###### copy .env.SAMPLE file to .env and edit it.
###### Change the Mysql Credentials and the server ip and port.
###### Now install the project dependencies with node install. and wait for it to finish
###### Once it finishes, and the DB is configured and the .env parameter setted, just run node index.js
###### This will create a swagger interface on ip:port/api/api-docs
###### There you can see the endpoint. however, in order to handle face detection and recognition it should be
###### Deployed with the Face Analytics 
https://github.com/kaiser24/Face_Recognizer_service

source /mnt/72086E48086E0C03/Projects/Face_Recognizer_Service/face_videoanalytics_venv/bin/activate
python /mnt/72086E48086E0C03/Projects/Face_Recognizer_Service/app.py

Bringing frontend from Angular Project
cp -r /mnt/72086E48086E0C03/Projects/VideoAnalytics_Server_Frontend/videoanalytics_server_frontend/dist/videoanalytics_server_frontend/* /mnt/72086E48086E0C03/Projects/VideoAnalytics_Server/public/dist/

node index.js

Share it

Cloudflare tunnel
https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel

cloudflared tunnel --url http://localhost:4000


Python signalling proxy for testing webrtc

bash /mnt/72086E48086E0C03/Projects/stream_tests/webrtc/start_server.sh
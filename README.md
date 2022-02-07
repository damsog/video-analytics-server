# VideoAnalytics_Server

# Python signalling proxy for testing webrtc until i work on the frontend

bash /mnt/72086E48086E0C03/Projects/stream_tests/webrtc/start_server.sh

source /mnt/72086E48086E0C03/Projects/Face_Recognizer_Service/face_videoanalytics_venv/bin/activate
python /mnt/72086E48086E0C03/Projects/Face_Recognizer_Service/app.py

Bringing frontend from Angular Project
cp -r /mnt/72086E48086E0C03/Projects/VideoAnalytics_Server_Frontend/videoanalytics_server_frontend/dist/videoanalytics_server_frontend/* /mnt/72086E48086E0C03/Projects/VideoAnalytics_Server/public/dist/

node index.js

Share it

Cloudflare tunnel
https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel

cloudflared tunnel --url http://localhost:4000
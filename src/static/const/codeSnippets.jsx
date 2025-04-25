const codeSnippets = {
    Python: `
import requests
import json

url = "https://dev.kopernica.cloud/api/v1/sync/xp/face-ai/process"

payload = json.dumps({
  "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/.....",
  "models": {
    "bboxes": "dlib",
    "landmarks": "mediapipe",
    "emotions": "ferKpN",
    "kpiEmotional": "default",
    "kpiAttentional": "default",
    "kpiComposed": "default"
  }
})
headers = {
  'client_id': 'f7f4c38d9fa64db..',
  'client_secret': '051f2478200544..',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIg...'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
`,
    JavaScript: `
const myHeaders = new Headers();
myHeaders.append("client_id", "f7f4c38d9fa64dbe95....");
myHeaders.append("client_secret", "051f2478200544....");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Mnl...");


const raw = JSON.stringify({
  "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/....",
  "models": {
    "bboxes": "dlib",
    "landmarks": "mediapipe",
    "emotions": "ferKpN",
    "kpiEmotional": "default",
    "kpiAttentional": "default",
    "kpiComposed": "default"
  }
});


const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};


fetch("https://dev.kopernica.cloud/api/v1/sync/xp/face-ai/process", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));`,

    Java: `
OkHttpClient client = new OkHttpClient().newBuilder()
.build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\r\n  \"image\": \"/9j/4AAQSkZJRgABAQAAAQABAAD....\",\r\n  \"models\": {\r\n    \"bboxes\": \"dlib\",\r\n    \"landmarks\": \"mediapipe\",\r\n    \"emotions\": \"ferKpN\",\r\n    \"kpiEmotional\": \"default\",\r\n    \"kpiAttentional\": \"default\",\r\n    \"kpiComposed\": \"default\"\r\n  }\r\n}");
Request request = new Request.Builder()
  .url("https://dev.kopernica.cloud/api/v1/sync/xp/face-ai/process")
  .method("POST", body)
  .addHeader("client_id", "6919b6782b3a405fba627c0dbc46bdc1")
  .addHeader("client_secret", "24228E4e69c245C29E1E8E111891a9E0")
  .addHeader("Content-Type", "application/json")
  .addHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Mnl...")
  .build();
Response response = client.newCall(request).execute();
`,
    PHP:
        `
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://dev.kopernica.cloud/api/v1/sync/xp/face-ai/process',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/.......",
  "models": {
    "bboxes": "dlib",
    "landmarks": "mediapipe",
    "emotions": "ferKpN",
    "kpiEmotional": "default",
    "kpiAttentional": "default",
    "kpiComposed": "default"
  }
}',
  CURLOPT_HTTPHEADER => array(
    'client_id: 6919b6782b3a405fba627c0dbc46bdc1',
    'client_secret: 24228E4e69c245C29E1E8E111891a9E0',
    'Content-Type: application/json',
    'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Mnl...'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

`
    ,
    NodeJS:

        `
const axios = require('axios');
let data = JSON.stringify({
  "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/.....",
  "models": {
    "bboxes": "dlib",
    "landmarks": "mediapipe",
    "emotions": "ferKpN",
    "kpiEmotional": "default",
    "kpiAttentional": "default",
    "kpiComposed": "default"
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dev.kopernica.cloud/api/v1/sync/xp/face-ai/process',
  headers: { 
    'client_id': '6919b6782b3a405fba627c0dbc46bdc1', 
    'client_secret': '24228E4e69c245C29E1E8E111891a9E0', 
    'Content-Type': 'application/json', 
    'Authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Mnl...'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

`,
    bash:
        `
#!/bin/bash

curl -X POST 'https://dev.kopernica.cloud/api/v1/sync/xp/face-ai/process' \
  -H 'client_id: 6919b6782b3a405fba627c0dbc46bdc1' \
  -H 'client_secret: 24228E4e69c245C29E1E8E111891a9E0' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5Mnl...' \
  -d '{
    "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/.....",
    "models": {
      "bboxes": "dlib",
      "landmarks": "mediapipe",
      "emotions": "ferKpN",
      "kpiEmotional": "default",
      "kpiAttentional": "default",
      "kpiComposed": "default"
    }
  }'

`
};

export default codeSnippets;
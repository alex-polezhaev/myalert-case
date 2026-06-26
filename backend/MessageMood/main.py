import json

from dostoevsky.tokenization import RegexTokenizer
from dostoevsky.models import FastTextSocialNetworkModel
from http.server import HTTPServer, BaseHTTPRequestHandler


def get_prediction(arr: list) -> list:
    tokenizer = RegexTokenizer()
    model = FastTextSocialNetworkModel(tokenizer=tokenizer)

    response = []
    results = model.predict(arr, k=2)
    for message, sentiment in zip(arr, results):
        response.append({'text': message, 'text_mood': sentiment})

    return response 


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        arr = json.loads(post_data)

        result = get_prediction(arr)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        self.wfile.write(json.dumps(result).encode('utf-8'))

if __name__ == '__main__':
    httpd = HTTPServer(('', 9005), SimpleHTTPRequestHandler)
    print('Server started on localhost:9005...')
    httpd.serve_forever()

 
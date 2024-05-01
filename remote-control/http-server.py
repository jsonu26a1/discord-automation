# import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler


class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
  def do_GET(self):
    self.send_header("Content-Security-Policy", "default-src *;")
    super().do_GET()

# Handler = BaseHTTPRequestHandler
# Handler = SimpleHTTPRequestHandler
Handler = CustomHTTPRequestHandler

server_address = ('127.0.0.1', 8000)
httpd = HTTPServer(server_address, Handler)
httpd.serve_forever()

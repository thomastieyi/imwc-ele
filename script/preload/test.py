# from socketserver import TCPServer, baseRequestHandler, ThreadingTCPServer
from socketserver import TCPServer, StreamRequestHandler, ThreadingMixIn
import traceback

# class MybaseRequestHandler(baseRequestHandler):
class MybaseRequestHandler(StreamRequestHandler):

  def handle(self):
    self.addr = self.request.getpeername()
    self.server.users[self.addr[1]] = self.request
    message = "IP " + self.addr[0] + ":" + str(self.addr[1]) + " Connected..."
    print(message)

    while True:
            try:
                data = self.request.recv(1024)
                print(data)

                self.request.sendall(data)
            except:
                traceback.print_exc()
                break

# 源码：class ThreadingTCPServer(ThreadingMixIn, TCPServer): pass
# 从ThreadingMixIn和TCPServer继承，实现多线程
class MyThreadingTCPServer(ThreadingMixIn, TCPServer):
  def __init__(self, server_address, RequestHandlerClass):
    TCPServer.__init__(self, server_address, RequestHandlerClass)
    self.users = {}


class MyTCPserver():
  def __init__(self, server_addr='0.0.0.0', server_port=8080):
    self.server_address = server_addr
    self.server_port = server_port
    self.server_tuple = (self.server_address, self.server_port)

  def run(self):
    # server = TCPServer(self.server_tuple, MybaseRequestHandler)
    server = MyThreadingTCPServer(self.server_tuple, MybaseRequestHandler)
    server.serve_forever()


if __name__ == '__main__':
  myserver = MyTCPserver()
  myserver.run()

import socket

# 指定协议
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 让端口可以重复使用
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
# 绑定ip和端口
server.bind(('0.0.0.0', 8080))
# 监听
server.listen(1)
# 等待消息
while True:
  clientsocket, address = server.accept()
  # 接收消息
  data = clientsocket.recv(1024)
  print(data,len(data))
  clientsocket.send(data)
# 关闭socket
clientsocket.close()
server.close()

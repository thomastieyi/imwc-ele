import socket
print("嗨客网(www.haicoder.net)")
host = "127.0.0.1"
port = 10000
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((host, port))
print("udp server start on port:", port)
while True:
    data, addr = sock.recvfrom(1024)
    print("Receive data = %s" % data)
    if data == b"exit":
        sock.sendto(b"Goodbye!\n", addr)
        continue
    if data == b'at+cfun=1':
        sock.sendto(b"ok\n", addr)
    else:
        sock.sendto(b"ok,127.0.0.1:8888\n", addr)
#!/usr/local/bin/node
// Use the websocket-relay to serve a raw MPEG-TS over WebSockets. You can use
// ffmpeg to feed the relay. ffmpeg -> websocket-relay -> browser
// Example:
// node websocket-relay yoursecret 8081 8082
// ffmpeg -i <some input> -f mpegts http://localhost:8081/yoursecret

const fs = require("fs"),
  http = require("http"),
  WebSocket = require("ws")

const STREAM_SECRET = process.argv[2],
  STREAM_PORT = process.argv[3] || 8081,
  WEBSOCKET_PORT = process.argv[4] || 8082,
  RECORD_STREAM = false

// Websocket Server
const socketServer = new WebSocket.Server({ port: WEBSOCKET_PORT, perMessageDeflate: false })
socketServer.connectionCount = 0
socketServer.on("connection", function (socket, upgradeReq) {
  socketServer.connectionCount++
  console.log(upgradeReq.url.split("/")[1] + " wtacher")
  socket.streamName = upgradeReq.url.split("/")[1]
  console.log(
    "New WebSocket Connection: ",
    (upgradeReq || socket.upgradeReq).socket.remoteAddress,
    (upgradeReq || socket.upgradeReq).headers["user-agent"],
    "(" + socketServer.connectionCount + " total)"
  )
  socket.on("close", function (code, message) {
    socketServer.connectionCount--
    console.log("Disconnected WebSocket (" + socketServer.connectionCount + " total)")
  })
})
socketServer.broadcast = function (data, streamName) {
  socketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN && client.streamName == streamName) {
      client.send(data)
    }
  })
}

// HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
const streamServer = http.createServer(function (request, response) {
  const params = request.url.substr(1).split("/")

  console.log("Stream Connected: " + request.socket.remoteAddress + ":" + request.socket.remotePort)
  request.on("data", function (data) {
    const params = request.url.substr(1).split("/")
    // console.log(params[0])
    socketServer.broadcast(data, params[0])
    if (request.socket.recording) {
      request.socket.recording.write(data)
    }
  })
  request.on("end", function () {
    console.log("close")
    if (request.socket.recording) {
      request.socket.recording.close()
    }
  })

  // Record the stream to a local file?
  if (RECORD_STREAM) {
    const path = "recordings/" + Date.now() + ".ts"
    request.socket.recording = fs.createWriteStream(path)
  }
})
// Keep the socket open for streaming
streamServer.headersTimeout = 0
streamServer.listen(STREAM_PORT)

console.log("Listening for incomming MPEG-TS Stream on http://127.0.0.1:" + STREAM_PORT + "/<secret>")
console.log("Awaiting WebSocket connections on ws://127.0.0.1:" + WEBSOCKET_PORT + "/")

export default { ws: socketServer, http: streamServer }

import { ref } from "vue"
import { nrSrsIqEst } from "@/utils/MESSAGE/srsinfo"
const net: typeof import("net") = require("net")
const dgram: typeof import("dgram") = require("dgram")

export class UDPServer {
  server = dgram.createSocket("udp4")

  constructor(port: number) {
    this.server.once("message", (msg, rinfo) => {
      console.log("rinfo.address =  " + rinfo.address)
      console.log("rinfo.port =  " + rinfo.port)
      // console.log(nrSrsIqEst.decode(msg))
    })

    this.server.on("listening", () => {
      console.log("address:" + this.server.address().address)
      console.log("port:" + this.server.address().port)
    })

    this.server.bind(7777)
  }
}

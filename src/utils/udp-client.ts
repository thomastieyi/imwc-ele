import { ref } from "vue"
import { nrSrsIqEst } from "@/utils/MESSAGE/srsinfo"
const net: typeof import("net") = require("net")
const dgram: typeof import("dgram") = require("dgram")

export class UDPClient {
  client = dgram.createSocket("udp4")
  udp_conn_msgs = ref([{ msg: "UDP", updown: true }])
  constructor(port: number) {
    this.client.once("message", (msg, rinfo) => {
      console.log("rinfo.address =  " + rinfo.address)
      console.log("rinfo.port =  " + rinfo.port)
      console.log(msg)
      // console.log(nrSrsIqEst.decode(msg))
    })




      // this.client.bind(7777)
  }
}

import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { da } from "element-plus/es/locale"
import { UDPServer } from "@/utils/udp-server"
import { UDPClient } from "@/utils/udp-client"
import { nrSrsIqEst } from "@/utils/MESSAGE/srsinfo"
// import { TcpClient } from "script/preload/tcp-client"
const dgram: typeof import("dgram") = require("dgram")
const net: typeof import("net") = require("net")
export const useUdpStore = defineStore("udpclient", () => {

  const udp_v = new UDPClient(7777)
  const aport = ref(10000)
  const ahost = ref("172.26.100.8")
  udp_v.client.on("message", (msg, rinfo) => {
    // console.log("rinfo.address =  " + rinfo.address)
    // console.log("rinfo.port =  " + rinfo.port)
    udp_v.udp_conn_msgs.value.push({msg:msg.toString(),updown:false})
    console.log(msg.toString())
  })
  const send_udp_msg = (msg : string,port,host)=>{
    aport.value = port
    ahost.value = host
    udp_v.udp_conn_msgs.value.push({msg:msg,updown:true})
    udp_v.client.send(msg,port,host,(err) => {
      // client.close();
      console.log(err)
    })
  }

  return { udp_v ,aport, ahost, send_udp_msg}
})

/** 在 setup 外使用 */
export function useTcpStoreHook() {
  return useUdpStore(store)
}

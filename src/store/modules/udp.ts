import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { da } from "element-plus/es/locale"
import { UDPServer } from "@/utils/udp-server"
import { nrSrsIqEst } from "@/utils/MESSAGE/srsinfo"
// import { TcpClient } from "script/preload/tcp-client"
const dgram: typeof import("dgram") = require("dgram")
const net: typeof import("net") = require("net")
export const useUdpStore = defineStore("udpserver", () => {
  console.log("udp_srs")

  const srs_data = ref(nrSrsIqEst.fromPartial({}))
  const udp_srs = new UDPServer(7777)
  udp_srs.server.on("message", (msg, rinfo) => {
    // console.log("rinfo.address =  " + rinfo.address)
    // console.log("rinfo.port =  " + rinfo.port)
    srs_data.value = nrSrsIqEst.decode(msg)
  })

  return { udp_srs, srs_data }
})

/** 在 setup 外使用 */
export function useTcpStoreHook() {
  return useUdpStore(store)
}

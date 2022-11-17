import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { da } from "element-plus/es/locale"
import { TCPClient } from "@/utils/tcp-client"
// import { TcpClient } from "script/preload/tcp-client"
const net: typeof import("net") = require("net")
export const useTcpStore = defineStore("tcpclient", () => {
  const client_names = ref("")
  const tcp_pool = new Array<TCPClient>()

  const getTcpConnByName = (clientName: string) => {
    for (let i = 0; i < tcp_pool.length; i++) {
      if (tcp_pool[i].clientName_ == clientName) {
        return tcp_pool[i]
      }
    }
  }
  const addTcpPool = (clientName: string) => {
    if (!getTcpConnByName(clientName)) {
      client_names.value += "..." + clientName
      tcp_pool.push(new TCPClient(clientName))
      return tcp_pool
    }
  }
  const delTcpConnByName = (clientName: string) => {
    let flag = -1
    for (let i = 0; i < tcp_pool.length; i++) {
      if (tcp_pool[i].clientName_ == clientName) {
        tcp_pool[i].tcp_client.destroy()
        flag = i
      }
    }
    if (flag >= 0) {
      const a = client_names.value.split("...")
      a.splice(flag + 1, 1)
      client_names.value = a.join("...")
      tcp_pool.splice(flag, 1)
    }
  }
  addTcpPool("Vivo终端")
  return { tcp_pool, getTcpConnByName, addTcpPool, delTcpConnByName, client_names }
})

/** 在 setup 外使用 */
export function useTcpStoreHook() {
  return useTcpStore(store)
}

import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { da } from "element-plus/es/locale"
const net: typeof import("net") = require("net")
export const useTcpStore = defineStore("tcpclient", () => {
  const client = new net.Socket()
  const state = ref("UNCONNECTED")
  const conn_info = ref({ host: "127.0.0.1", port: 8080 })
  const conn_msgs = ref([{ msg: "Begin", updown: true }])
  client.on("close", (s) => {
    state.value = "UNCONNECTED"
    console.log("close")
  })
  client.on("end", (s) => {
    state.value = "UNCONNECTED"
    console.log("end")
  })

  const conn = async (port = conn_info.value.port, host = conn_info.value.host): Promise<string> => {
    const res = new Promise<any>((resolve, reject) => {
      client.on("error", (err) => {
        console.log(err)
        reject(err)
      })
      client.connect(port, host, () => {
        conn_info.value.port = port
        conn_info.value.host = host
        state.value = "CONNECTED"
        resolve(state.value)
      })
    })
    return res
  }

  const push_msg = (msg: any, updown: boolean) => {
    conn_msgs.value.push({ msg: msg, updown: updown })
  }

  const sent = async (msg: any): Promise<any> => {
    const res = new Promise<any>((resolve, reject) => {
      try {
        client.write(msg, (error) => {
          if (error) {
            state.value = "UNCONNECTED"
            reject(error)
          }
        })
        push_msg(msg, true)
        resolve(msg)
      } catch (error) {
        state.value = "UNCONNECTED"
        reject(error)
      }
    })
    return res
  }
  // client.on("data", (data) => {
  //   push_msg(data, false)
  // })

  const recv = async (): Promise<any> => {
    const res = new Promise<any>((resolve, reject) => {
      client.on("data", (data) => {
        resolve(data)
      })
    })
    return res
  }

  const disconn = async (): Promise<any> => {
    const res = new Promise<any>((resolve, reject) => {
      client.destroy()
      client.on("close", () => {
        state.value = "UNCONNECTED"
        resolve("Closed")
      })
    })
    return res
  }

  return { client, conn, sent, recv, state, disconn, conn_info, conn_msgs, push_msg }
})

/** 在 setup 外使用 */
export function useTcpStoreHook() {
  return useTcpStore(store)
}

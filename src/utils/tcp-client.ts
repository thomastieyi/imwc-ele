import { ref } from "vue"

const net: typeof import("net") = require("net")
export class TCPClient {
  tcp_client = new net.Socket()
  tcp_state = ref("UNCONNECTED")
  tcp_conn_info = ref({ host: "127.0.0.1", port: 8080 })
  tcp_conn_msgs = ref([{ msg: "Begin", updown: true }])
  clientName_: string
  constructor(clientName: string) {
    console.log(clientName)
    this.clientName_ = clientName
    this.tcp_conn_msgs.value[0].msg = `tcp://${clientName}`
  }
  tcp_conn = async (port = this.tcp_conn_info.value.port, host = this.tcp_conn_info.value.host): Promise<string> => {
    this.tcp_conn_info.value.port = port
    this.tcp_conn_info.value.host = host
    const res = new Promise<any>((resolve, reject) => {
      try {
        this.tcp_state.value = "CONNECTING"
        this.tcp_client.connect(port, host, () => {
          this.tcp_conn_info.value.port = port
          this.tcp_conn_info.value.host = host
          this.tcp_state.value = "CONNECTED"
          resolve(this.tcp_state.value)
        })
        this.tcp_client.once("error", (err) => {
          this.tcp_state.value = "UNCONNECTED"
          reject(err)
        })
      } catch (error) {
        console.log(error)
      }
    })
    return res
  }

  tcp_push_msg = (msg: any, updown: boolean) => {
    console.log(this.tcp_conn_msgs)
    this.tcp_conn_msgs.value.push({ msg: msg, updown: updown })
  }

  tcp_sent = async (msg: any): Promise<any> => {
    const res = new Promise<any>((resolve, reject) => {
      try {
        this.tcp_client.write(msg, (error) => {
          if (error) {
            this.tcp_state.value = "UNCONNECTED"
            reject(error)
          }
        })
        this.tcp_push_msg(msg, true)
        resolve(msg)
      } catch (error) {
        this.tcp_state.value = "UNCONNECTED"
        reject(error)
      }
    })
    return res
  }
  // client.on("data", (data) => {
  //   push_msg(data, false)
  // })

  tcp_recv = async (): Promise<any> => {
    const res = new Promise<any>((resolve, reject) => {
      this.tcp_client.once("data", (data) => {
        resolve(data)
      })
    })
    return res
  }

  tcp_recv_long = (cb: (data: any) => void): void => {
    this.tcp_client.on("data", cb)
  }

  tcp_disconn = async (): Promise<any> => {
    const res = new Promise<any>((resolve, reject) => {
      this.tcp_client.destroy()
      this.tcp_client.on("close", () => {
        this.tcp_state.value = "UNCONNECTED"
        resolve("Closed")
      })
    })
    return res
  }
}

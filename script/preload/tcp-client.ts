const net: typeof import("net") = require("net")
let host: string | "127.0.0.1"
let port: Number | 8080
let client = new net.Socket()

// const TcpClient= ()=> {

const setPara = (host1: string, port1: Number) => {
  host = host1
  port = port1
  // this.conn()
  console.log(port)
}

const conn = async (): Promise<string> => {
  const res = new Promise<any>((resolve, reject) => {
    try {
      client = new net.Socket()
      client.connect(8080, "127.0.0.1", () => {
        client.write("上线了.")
      })
      console.log(client)
    } catch (error: any) {
      reject(error)
    }
  })
  return res
}

const sent = async (msg: Uint8Array): Promise<Uint8Array> => {
  const res = new Promise<Uint8Array>((resolve, reject) => {
    try {
      client.write(msg)
      resolve(msg)
    } catch (error) {
      reject(error)
    }
  })
  return res
}

const recv = async (): Promise<Uint8Array> => {
  const res = new Promise<Uint8Array>((resolve, reject) => {
    client.on("data", (data) => {
      // resolve(String.fromCharCode.apply(null, data))
      resolve(data)
    })
    // try {
    //   const r = this.client.recv(msg)
    //   resolve("Successful send msg: " + msg)
    // } catch (error) {
    //   reject(error)
    // }
  })
  return res
}
// }
export const TcpClient = {
  setTcpLink: (host, port) => {
    return setPara(host, port)
  },
  send: (msg) => {
    return sent(msg)
  },
  conn: () => {
    return conn()
  },
  recv: () => {
    return recv()
  }
}

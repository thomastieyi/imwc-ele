const net = require("net")
let host: string | undefined
let port: Number | undefined
let client: any | undefined

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
      client = net.connect({ server: host, port: port }, () => {
        resolve("client connected")
      })
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

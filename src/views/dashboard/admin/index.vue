<script lang="ts">
import { UEInfo } from "@/utils/MESSAGE/info"

export default {
  data() {
    return { res: new Uint8Array(), client: window.$tcpClient }
  },
  async mounted() {
    console.log(this.client)
    const ue1: UEInfo = UEInfo.create()
    ue1.dLBLER = 100.1
    ue1.uEID = 120
    ue1.timeStamp = BigInt(9007199214740911)
    console.log("ueTam")
    console.log(ue1)
    this.client.setTcpLink("192.169.23.1", 8080)
    this.client.conn()
    this.res = await this.client.send(UEInfo.toBinary(ue1))
    this.res = await this.client.recv()
    const ueRec: UEInfo = UEInfo.fromBinary(this.res)
    console.log("ueRec")
    console.log(ueRec)
  }
}
</script>
<template>
  <div class="app-container">{{ res }}</div>
</template>

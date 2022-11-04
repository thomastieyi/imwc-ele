<script lang="ts">
export default {
  data() {
    return { res: "load", client: window.$tcpClient }
  },
  async mounted() {
    console.log(this.client)
    this.client.setTcpLink("192.169.23.1", 12345)
    this.client.conn()
    this.res = await this.client.send("asdasdqqwe")
    this.res = await this.client.recv()
  }
}
</script>
<template>
  <div class="app-container">{{ res }}</div>
</template>

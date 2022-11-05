<script lang="ts" setup>
import { useTcpStore } from "@/store/modules/tcp"
import { UEInfo } from "@/utils/MESSAGE/info"
import { onBeforeUnmount, onMounted, ref } from "vue"
const res = ref(new Uint8Array())
const client = useTcpStore()
const input = ref("tcp sento")
const state = client.state
onMounted(async () => {
  res.value = new Uint8Array([1])
  // await client.conn(8080, "127.0.0.1")
  // console.log(client.client)
  // await client.sent(new Uint8Array([127]))
  // res.value = await client.recv()
  // console.log(res.value)
  // console.log(client.client)
  // await client.sent(new Uint8Array([2]))
  // res.value = await client.recv()
  // console.log(res.value)
  // await client.sent(new Uint8Array([3]))
  // res.value = await client.recv()
  // console.log(res.value)
})

const conn = async () => {
  console.log(await client.conn(8081, "127.0.0.1"))
}
const disconn = async () => {
  console.log(await client.disconn())
}
const send = async () => {
  await client.sent(input.value)
  res.value = await client.recv()
  client.push_msg(res.value, false)
  console.log(client.state)
}
</script>
<template>
  <div class="app-container">
    recv data : {{ res }}
    {{ client.state }}
    <div>
      <el-input v-model="input" placeholder="Please input" />
      <el-button @click="conn">conn</el-button>
      <el-button @click="send">send</el-button>
      <el-button @click="disconn">disconn</el-button>
    </div>
  </div>
</template>

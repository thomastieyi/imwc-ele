<script lang="ts" setup>
import { useTcpStore } from "@/store/modules/tcp"
import { UEInfo } from "@/utils/MESSAGE/info"
import VideoCard from "@/components/VideoCard/index.vue"
import {
  RpcRequest,
  RpcRequest_ResourceActionEnum,
  RpcResponse,
  SliceInfoCreateMessage,
  SliceInfoGetMessage
} from "@/utils/MESSAGE/action"
import { onBeforeUnmount, onMounted, ref } from "vue"
import JSMpeg from "@/utils/jsmpeg"
const res = ref(new Uint8Array())
const TCP = useTcpStore()
const input = ref("tcp sento")
const loading = ref(false)
// const state = client.state
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
  TCP.addTcpPool("test_admin")
  // console.log(await client.conn())
}
const disconn = async () => {
  TCP.delTcpConnByName("test_admin")
  // console.log(await client.disconn())
}
const send = async () => {
  await TCP.getTcpConnByName("test_admin")?.tcp_sent(input.value)
  res.value = await TCP.getTcpConnByName("test_admin")?.tcp_recv()
  TCP.getTcpConnByName("test_admin")?.tcp_push_msg(res.value, false)
  // const rpcRequest = RpcRequest.fromPartial({ ResourceAction: RpcRequest_ResourceActionEnum.SLICE_GET_ALL })
  // // rpcRequest.sliceInfoCreateMessage = SliceInfoCreateMessage.fromPartial({ SliceCreated: { SliceID: 1 } })
  // console.log(rpcRequest)
  // console.log(RpcRequest.encode(rpcRequest).finish())
  // await client.sent(RpcRequest.encode(rpcRequest).finish())
  // res.value = await client.recv()
  // client.push_msg(res.value, false)
  // console.log("RpcRequest.decode(res.value)")
  // console.log(RpcResponse.decode(res.value))
}
</script>
<template>
  <div class="app-container">
    <div v-loading="loading" v-if="loading" style="width: 100%; height: 100%" />
    <!-- <iframe @load="loading = false" class="codebox" src="http://slice.icfn.top/#/index?url=127.0.1.1" /> -->
    <!-- <VideoCard stream-name="VR" title="TEST_VR" /> -->
    <!-- <VideoCard stream-name="preview" title="TEST_preview" /> -->
  </div>
</template>
<style lang="scss" scoped>
.app-container {
  padding: 0px !important;
  height: 100% !important;
  width: 100%;
}
.codebox {
  // margin-top: -18px;
  // margin-left: -20px;
  // margin-right: -20px;
  height: 99%;
  width: 100%;
}
</style>

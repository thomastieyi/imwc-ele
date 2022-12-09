<script lang="ts" setup>
import { useTcpStore } from "@/store/modules/tcp"
import * as echarts from "echarts"
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useUdpStore } from "@/store/modules/udp"
import { EChartsOption } from "echarts"
const res = ref(new Uint8Array())
const TCP = useTcpStore()
const UDP = useUdpStore()
const input = ref("tcp sento")
const chart = ref()

const data = computed(() => {
  const data1 = [[0, 0]]
  data1.shift()
  let maxx = 1
  let maxy = 1

  return data1
})
watch(data, (n, o) => {
  const option = {
    xAxis: {},
    yAxis: {},
    animation: false,
    series: [
      {
        symbolSize: 8,
        data: data.value,
        type: "scatter"
      }
    ]
  }

  option && chart.value.setOption(option)
})

// const state = client.state
onMounted(async () => {
  const chartDom = document.getElementById("echart")!
  type EChartsOption = echarts.EChartsOption

  const myChart = echarts.init(chartDom)
  chart.value = myChart
  res.value = new Uint8Array([1])
  const data = [[0, 0]]
  data.unshift()

  const option = {
    xAxis: {
      min: 1,
      max: -1
    },
    yAxis: {
      min: 1,
      max: -1
    },
    animation: false,
    series: [
      {
        symbolSize: 2,
        data: data,
        type: "scatter"
      }
    ]
  }

  option && myChart.setOption(option)
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
  const option = {
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: data.value,
        type: "scatter"
      }
    ]
  }

  option && chart.value.setOption(option)
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
    recv data : {{ res }}
    <!-- {{ client.state }} -->
    <div>
      <el-input v-model="input" placeholder="Please input" />
      <el-button @click="conn">conn</el-button>
      <el-button @click="send">send</el-button>
      <el-button @click="disconn">disconn</el-button>
    </div>
    <div id="echart" />
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  width: 100% !important;
}
#echart {
  width: 100%;
  height: 600px;
}
</style>

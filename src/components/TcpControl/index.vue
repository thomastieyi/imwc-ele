<script lang="ts" setup>
import { type ThemeName, useTheme } from "../../hooks/useTheme"
import { CircleCloseFilled, Connection, Loading, MagicStick, Sugar } from "@element-plus/icons-vue"
import { useTcpStore } from "@/store/modules/tcp"
import { computed, h, onMounted, ref, watch } from "vue"
import { ElTooltip, ElIcon, ElDrawer, ElButton, ElNotification } from "element-plus"
import TcpMsgTip from "@/components/TcpMsgTip/index.vue"
import { Terminal } from "xterm"
import { TCPClient } from "@/utils/tcp-client"
import "xterm/css/xterm.css"
import { setInterval } from "timers/promises"
const TCP = useTcpStore()
const show = ref(false)
const currTcpName = ref("Vivo终端")
const names = computed(() => {
  const a = TCP.client_names.split("...")
  a.shift()
  return a
})
const err = ref(300)
const Vivo终端Conn = computed(() => {
  return TCP.getTcpConnByName("Vivo终端")?.tcp_state.value
})
const new_conn = ref(false)
watch(names, (o, n) => {
  new_conn.value = true
})

watch(Vivo终端Conn, (n, o) => {
  console.log(n)
  if (n == "UNCONNECTED") {
    if (o == "CONNECTED") {
      ElNotification({
        title: "失去连接",
        message: h("i", { style: "color: red" }, JSON.stringify("UNCONNECTED")),
        duration: 1500,
        type: "error",
        position: "bottom-right"
      })
    }
    // setTimeout(() => {
    //   conn()
    // }, err.value)
  }
})
// watch(TCP.tcp_pool, (o, n) => {
//   console.log(n)
// })
const ahost = ref()
const aport = ref()

const handleSetTcp = (clientName: string) => {
  currTcpName.value = clientName
  ahost.value = TCP.getTcpConnByName(currTcpName.value)?.tcp_conn_info.value.host
  aport.value = TCP.getTcpConnByName(currTcpName.value)?.tcp_conn_info.value.port
  console.log(clientName)
  show.value = true
  new_conn.value = false
}
const handleAddTcp = (clientName: string) => {
  currTcpName.value = clientName
  console.log(clientName)
  show.value = true
}
// console.log(TCP.tcp_pool[0].client)
// client.tcp_pool.conn(8080, "127.0.0.1")
onMounted(() => {
  ahost.value = "192.168.1.220"
  aport.value = 9999

  // if (TCP.getTcpConnByName(currTcpName.value)?.tcp_state.value == "UNCONNECTED") {
  conn()
  // }
})
const conn = async () => {
  // await client.conn()
  console.log(TCP.getTcpConnByName(currTcpName.value))
  // await TCP.addTcpPool("test")
  try {
    await TCP.getTcpConnByName(currTcpName.value)?.tcp_conn(aport.value, ahost.value)
    ElNotification({
      title: `${currTcpName.value}连接成功`,
      message: h("i", { style: "color: teal" }, `${ahost.value}:${aport.value}`),
      duration: 2000,
      type: "success",
      position: "bottom-right"
    })
    err.value = 300
  } catch (error) {
    console.log(error)
    // ElMessage.error('Oops, this is a error message.')
    // ElNotification({
    //   title: "连接失败",
    //   message: h("i", { style: "color: red" }, JSON.stringify(error)),
    //   duration: 1500,
    //   type: "error",
    //   position: "bottom-right"
    // })
    // err.value *= 2
  }
  // TCP.getTcpConnByName(currTcpName.value)?.tcp_push_msg("asdasd", true)
}
console.log(names)
const disconn = async () => {
  await TCP.getTcpConnByName(currTcpName.value)?.tcp_disconn()
  // console.log(await client.disconn())
}
</script>

<template>
  <el-dropdown trigger="click">
    <el-badge :is-dot="new_conn" class="item">
      <div>
        <el-tooltip effect="dark" content="TCP连接情况" placement="bottom">
          <el-icon
            :size="20"
            :color="TCP.getTcpConnByName(currTcpName)?.tcp_state.value == 'CONNECTED' ? '#67C23A' : '#F56C6C'"
          >
            <Connection />
          </el-icon>
        </el-tooltip>
      </div>
    </el-badge>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="client in names" :key="client" @click="handleSetTcp(client)">
          <div class="dropdown">
            <div class="clientname">{{ client }}</div>
            <el-icon
              :size="20"
              class="icon"
              :color="TCP.getTcpConnByName(client)?.tcp_state.value == 'CONNECTED' ? '#67C23A' : '#F56C6C'"
            >
              <Connection />
            </el-icon>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- <div @click="handleSetTcp">
    <el-tooltip
      effect="dark"
      :content="TCP.getTcpConnByName('default')?.tcp_state.value == 'CONNECTED' ? 'TCP连接成功' : '已断开'"
      placement="bottom"
    >
      <el-icon
        :size="20"
        :color="TCP.getTcpConnByName('default')?.tcp_state.value == 'CONNECTED' ? '#67C23A' : '#F56C6C'"
      >
        <Connection />
      </el-icon>
    </el-tooltip>
  </div> -->

  <el-drawer v-model="show" size="350px" :show-close="false" :with-header="false">
    <div class="dropdown" v-if="TCP.getTcpConnByName(currTcpName)?.tcp_state.value == 'CONNECTED'">
      <div class="clientname">'{{ TCP.getTcpConnByName(currTcpName)?.clientName_ }}' 连接成功</div>
      <el-icon :size="20" class="icon" :color="'#67C23A'">
        <Connection />
      </el-icon>
    </div>
    <div class="dropdown" v-if="TCP.getTcpConnByName(currTcpName)?.tcp_state.value == 'UNCONNECTED'">
      <div class="clientname">'{{ TCP.getTcpConnByName(currTcpName)?.clientName_ }}' 连接失败</div>
      <el-icon :size="20" class="icon" :color="'#F56C6C'">
        <Connection />
      </el-icon>
    </div>
    <div class="dropdown" v-if="TCP.getTcpConnByName(currTcpName)?.tcp_state.value == 'CONNECTING'">
      <div class="clientname">'{{ TCP.getTcpConnByName(currTcpName)?.clientName_ }}' 尝试连接</div>
      <el-icon :size="20" class="icon" :color="'#67C23A'">
        <Loading />
      </el-icon>
    </div>

    <!-- {{ TCP.getTcpConnByName(currTcpName)?.tcp_conn_info.value.host }}:{{
      TCP.getTcpConnByName(currTcpName)?.tcp_conn_info.value.port
    }} -->
    <el-input
      v-model="ahost"
      placeholder="Please input"
      :disabled="TCP.getTcpConnByName(currTcpName)?.tcp_state.value == 'CONNECTED'"
    >
      <template #prepend>HOST</template>
    </el-input>
    <el-input
      v-model="aport"
      placeholder="Please input"
      :disabled="TCP.getTcpConnByName(currTcpName)?.tcp_state.value == 'CONNECTED'"
    >
      <template #prepend>PORT</template>
    </el-input>
    <div class="input">
      <el-button
        type="success"
        @click="conn"
        :disabled="TCP.getTcpConnByName(currTcpName)?.tcp_state.value !== 'UNCONNECTED'"
        >连接</el-button
      >
      <el-button
        type="danger"
        @click="disconn"
        :disabled="TCP.getTcpConnByName(currTcpName)?.tcp_state.value !== 'CONNECTED'"
        >断开</el-button
      >
    </div>

    <el-divider />
    <TcpMsgTip v-model:client-name="currTcpName" />
    <!-- <div v-for="item in client.conn_msgs" v-bind:key="item.msg">
      <TcpMsgTip :updown="item.updown" :msg="item.msg" />
    </div> -->
  </el-drawer>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  margin-top: 5px;
  margin-bottom: -20px;
}

.result {
  margin-bottom: -40px;
  margin-top: 80px;
}

.dropdown {
  display: flex;
  justify-content: space-between;
}

.clientname {
  // margin-right: 166px;
}

.icon {
  display: inline;
}
</style>

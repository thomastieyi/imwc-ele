<script lang="ts" setup>
import { type ThemeName, useTheme } from "../../hooks/useTheme"
import { CircleCloseFilled, Connection, Loading, MagicStick, Sugar } from "@element-plus/icons-vue"
import { useTcpStore } from "@/store/modules/tcp"
import { computed, h, onMounted, ref, watch } from "vue"
import { ElTooltip, ElIcon, ElDrawer, ElButton, ElNotification } from "element-plus"
import TcpMsgTip from "@/components/TcpMsgTip/index.vue"
import UdpMsgTip from "@/components/UdpMsgTip/index.vue"
import { Terminal } from "xterm"
import { TCPClient } from "@/utils/tcp-client"
import "xterm/css/xterm.css"
import { setInterval } from "timers/promises"
import { useUdpStore } from "@/store/modules/udp"
const TCP = useTcpStore()
const UDP = useUdpStore()
const show = ref(false)
const currTcpName = ref("Vivo终端")
const names = computed(() => {
  const a = TCP.client_names.split("...")
  a.shift()
  return a
})
const err = ref(300)
const textarea2 = ref("请输入AT指令")
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
const conn_str = computed(() => {
  return UDP.ahost + ":"+ UDP.aport
})
watch(conn_str, (o, n) => {
  console.log(o,n)
  ahost.value = UDP.ahost
  aport.value = UDP.aport
})
const ahost = ref()
const aport = ref()

const handleSetTcp = (clientName: string) => {
  currTcpName.value = clientName
  ahost.value = UDP.ahost
  aport.value = UDP.aport
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
  ahost.value = UDP.ahost
  aport.value = UDP.aport
  // if (TCP.getTcpConnByName(currTcpName.value)?.tcp_state.value == "UNCONNECTED") {
  // conn()
  // }
})

const options = [
  {
    value: 'at+cfun=1',
    label: 'at+cfun=1',
  },
  {
    value: 'at+CGDCONT=1,IPV4V6,,,,,,,,,cs-ai-acceleration,1\r',
    label: '算力请求',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const conn = async () => {
  // await client.conn()
  // await TCP.addTcpPool("test")
  try {
    UDP.send_udp_msg(textarea2.value,aport.value,ahost.value)
    // await TCP.getTcpConnByName(currTcpName.value)?.tcp_conn(aport.value, ahost.value)
    ElNotification({
      title: `AT指令  发送成功`,
      message: h("i", { style: "color: teal" }, `${textarea2.value}`),
      duration: 2000,
      type: "success",
      position: "bottom-right"
    })
    // err.value = 300
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
        <el-tooltip effect="dark" content="UDP对话框" placement="bottom">
          <el-icon
            :size="20"
            :color="'#67C23A'"
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
              :color="'#67C23A'"
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
    <div class="dropdown">
      <div class="clientname">UDP客户端</div>
      <el-icon :size="20" class="icon" :color="'#67C23A'">
        <Connection />
      </el-icon>
    </div>
 

    <!-- {{ TCP.getTcpConnByName(currTcpName)?.tcp_conn_info.value.host }}:{{
      TCP.getTcpConnByName(currTcpName)?.tcp_conn_info.value.port
    }} -->
    <el-input
      v-model="ahost"
      placeholder="Please input"
    >
      <template #prepend>HOST</template>
    </el-input>
    <el-input
      v-model="aport"
      placeholder="Please input"
    >
      <template #prepend>PORT</template>
    </el-input>
    <el-input
    v-model="textarea2"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="Please input"
  />
    <div class="input">
      <el-button
        type="success"
        @click="conn"
        >发送</el-button
      >
    <el-select class="select" v-model="textarea2">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
    </div>

    <el-divider />
    <UdpMsgTip v-model:client-name="currTcpName" />
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


.icon {
  display: inline;
}
</style>

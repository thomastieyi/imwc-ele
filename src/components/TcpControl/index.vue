<script lang="ts" setup>
import { type ThemeName, useTheme } from "../../hooks/useTheme"
import { CircleCloseFilled, Connection, MagicStick } from "@element-plus/icons-vue"
import { useTcpStore } from "@/store/modules/tcp"
import { computed, ref } from "vue"
import { ElTooltip, ElIcon, ElDrawer, ElButton } from "element-plus"
import TcpMsgTip from "@/components/TcpMsgTip/index.vue"
import { Terminal } from "xterm"
import "xterm/css/xterm.css"
const client = useTcpStore()
const show = ref(false)
const handleSetTcp = () => {
  show.value = true
}

const conn = async () => {
  await client.conn()
  console.log("res")
}
const disconn = async () => {
  console.log(await client.disconn())
}
</script>

<template>
  <div @click="handleSetTcp">
    <el-tooltip effect="dark" :content="client.state == 'CONNECTED' ? 'TCP连接成功' : '已断开'" placement="bottom">
      <el-icon :size="20" :color="client.state == 'CONNECTED' ? '#67C23A' : '#F56C6C'">
        <Connection />
      </el-icon>
    </el-tooltip>
  </div>

  <el-drawer v-model="show" size="350px" :show-close="false" :with-header="false">
    <div class="result">
      <el-result
        :icon="client.state == 'CONNECTED' ? 'success' : 'error'"
        :title="client.state == 'CONNECTED' ? 'TCP连接成功' : 'TCP连接已断开'"
      />
    </div>
    <el-input v-model="client.conn_info.host" placeholder="Please input" :disabled="client.state == 'CONNECTED'">
      <template #prepend>HOST</template>
    </el-input>
    <el-input v-model="client.conn_info.port" placeholder="Please input" :disabled="client.state == 'CONNECTED'">
      <template #prepend>PORT</template>
    </el-input>
    <div class="input">
      <el-button type="success" @click="conn" :disabled="client.state !== 'UNCONNECTED'">连接</el-button>
      <el-button type="danger" @click="disconn" :disabled="client.state !== 'CONNECTED'">断开</el-button>
    </div>

    <el-divider />
    <TcpMsgTip />
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
  margin-top: -40px;
}
</style>

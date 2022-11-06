<script lang="ts" setup>
import { CaretBottom, CaretTop } from "@element-plus/icons-vue"
import { ElTooltip, ElIcon, ElDrawer, ElButton } from "element-plus"
import { onMounted, ref, watch } from "vue"
import { Terminal } from "xterm"
import { useTcpStore } from "@/store/modules/tcp"
const client = useTcpStore()
const terminal = ref(null)
const term = ref(new Terminal())
watch(client.conn_msgs, () => {
  console.log(client.conn_msgs, "改变")
  term.value.writeln(
    `${client.conn_msgs[client.conn_msgs.length - 1].updown ? "↑" : "↓"} ${
      client.conn_msgs[client.conn_msgs.length - 1].msg
    }`
  )
})
onMounted(async () => {
  initTerm()
})
const initTerm = () => {
  term.value = new Terminal({
    lineHeight: 1.2,
    fontSize: 12,
    fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
    theme: {
      background: "#181d28"
    },
    // 光标闪烁
    cursorBlink: true,
    cursorStyle: "underline",
    scrollback: 100,
    tabStopWidth: 4
  })
  const s: HTMLElement = document.getElementById("terminal") as HTMLElement
  console.log(s)
  term.value.open(s)
}
</script>

<template>
  <div id="terminal" />
</template>
<style lang="scss" scoped>
#terminal {
  display: flex;
  margin-top: 5px;
  margin-bottom: -20px;
  overflow: hidden;
}
</style>

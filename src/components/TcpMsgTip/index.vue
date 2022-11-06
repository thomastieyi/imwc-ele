<script lang="ts" setup>
import { CaretBottom, CaretTop } from "@element-plus/icons-vue"
import { ElTooltip, ElIcon, ElDrawer, ElButton } from "element-plus"
import { computed, onActivated, onMounted, ref, watch } from "vue"
import { Terminal } from "xterm"
import { useTcpStore } from "@/store/modules/tcp"
const TCP = useTcpStore()
const terminal = ref(null)
const term = ref(new Terminal())
const props = defineProps({
  clientName: {
    default: "default",
    required: true
  }
})

const emits = defineEmits(["clientName"])

const clientName = computed({
  get() {
    return props.clientName
  },
  set(clientName) {
    console.log(clientName)
  }
})
watch(clientName, (n, o) => {
  printcnt.value = 0
  term.value.clear()
  term.value.writeln(`${n}`)
  while (printcnt.value < TCP.getTcpConnByName(n)!.tcp_conn_msgs.value.length) {
    term.value.writeln(
      `${TCP.getTcpConnByName(n)!.tcp_conn_msgs.value[printcnt.value].updown ? "↑" : "↓"} ${JSON.stringify(
        TCP.getTcpConnByName(n)!.tcp_conn_msgs.value[printcnt.value].msg
      )}`
    )
    printcnt.value++
  }
})

const printcnt = ref(0)

watch(TCP.getTcpConnByName(clientName.value)!.tcp_conn_msgs.value, (oldv, newv) => {
  console.log(newv)
  term.value.writeln(`${newv[newv?.length - 1].updown ? "↑" : "↓"} ${JSON.stringify(newv[newv.length - 1].msg)}`)
})
onMounted(async () => {
  initTerm()
  term.value.writeln(`${clientName.value}`)
  while (printcnt.value < TCP.getTcpConnByName(clientName.value)!.tcp_conn_msgs.value.length) {
    term.value.writeln(
      `${
        TCP.getTcpConnByName(clientName.value)!.tcp_conn_msgs.value[printcnt.value].updown ? "↑" : "↓"
      } ${JSON.stringify(TCP.getTcpConnByName(clientName.value)!.tcp_conn_msgs.value[printcnt.value].msg)}`
    )
    printcnt.value++
  }
})
onActivated(async () => {})
const initTerm = () => {
  term.value = new Terminal({
    rows: 45,
    lineHeight: 1.2,
    fontSize: 9.5,
    fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
    theme: {
      foreground: "yellow", //字体
      background: "#060101", //背景色
      cursor: "help" //设置光标
    },
    // 光标闪烁
    cursorBlink: false,
    cursorStyle: "underline",
    scrollback: 1,
    tabStopWidth: 4
  })
  const s: HTMLElement = document.getElementById("terminal") as HTMLElement
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
  // margin-bottom: -20px;
  overflow: auto;
}
</style>

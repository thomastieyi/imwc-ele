<script lang="ts" setup>
import { BottomLeft, CaretBottom, CaretTop } from "@element-plus/icons-vue"
import { ElTooltip, ElIcon, ElDrawer, ElButton } from "element-plus"
import { computed, onActivated, onMounted, ref, watch } from "vue"
import { Terminal } from "xterm"
import { useTcpStore } from "@/store/modules/tcp"
import { Item } from "electron"
const TCP = useTcpStore()
const terminal = ref(null)
const term = ref(new Terminal())
const show_up = ref(true)
const show_down = ref(true)
const props = defineProps({
  clientName: {
    default: "default",
    required: true
  }
})
const show_both = computed(() => {
  return show_down.value && show_up.value
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
})

const printcnt = ref(0)

watch(TCP.getTcpConnByName(clientName.value)!.tcp_conn_msgs.value, (oldv, newv) => {
  console.log(newv)
})
onMounted(async () => {})
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
  <div id="terminal">
    发送 <el-switch v-model="show_up" inline-prompt active-text="是" inactive-text="否" /> 接受
    <el-switch v-model="show_down" inline-prompt active-text="是" inactive-text="否" />
    <div v-for="item in TCP.getTcpConnByName(clientName)!.tcp_conn_msgs.value" v-bind:key="item.msg">
      <div class="p" v-if="show_both ? true : show_up == item.updown && show_down == !item.updown">
        <el-icon v-if="item.updown" :color="'green'"><TopRight /></el-icon
        ><el-icon v-if="!item.updown" :color="'#F56C6C'"><BottomLeft /></el-icon>
        <div class="line">{{ item.msg }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#terminal {
  // display: flex;
  margin-top: -20px;
  // margin-bottom: -20px;
  overflow: auto;
}
.p {
  // padding-top: -5px;
  display: flex;
}
.line {
  font-size: smaller;
  margin-top: 7.8px;
  margin-left: 7px;
  line-height: 1px;
  font-family: Georgia, "Times New Roman", Times, serif, Monaco, Menlo, Consolas, "Courier New", monospace;
  color: rgb(0, 0, 0);
}
</style>

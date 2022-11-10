<script lang="ts" setup>
import { BottomLeft, CaretBottom, CaretTop } from "@element-plus/icons-vue"
import { ElTooltip, ElIcon, ElDrawer, ElButton } from "element-plus"
import { computed, onActivated, onMounted, ref, watch } from "vue"
import { Terminal } from "xterm"
import { useTcpStore } from "@/store/modules/tcp"
import { Item } from "electron"
import JSMpeg from "@/utils/jsmpeg"
const TCP = useTcpStore()
const terminal = ref(null)
const term = ref(new Terminal())
const show_up = ref(true)
const show_down = ref(true)
const props = defineProps({
  clientName: {
    default: "default",
    required: true
  },
  title: {
    default: "Powered by OpenXG AI-Engine",
    required: true
  },
  streamName: {
    default: "ai",
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
onMounted(async () => {
  const canvas = document.getElementById(props.streamName)
  const player = new JSMpeg.Player(`ws://${document.domain}:8082/` + props.streamName, { canvas: canvas })
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
  <div class="vr-video">
    <div class="vr-video-header">{{ title }}</div>
    <canvas :id="streamName" style="width: 100%" />
    <!-- <video
        v-show="haveStream"
        :ref="videoElement"
        :id="videoElement"
        controls
        autoplay
        muted
        width="100%"
      ></video> -->
  </div>
</template>
<style lang="scss" scoped>
.vr-c {
  &-container {
  }

  &-stream-info {
    display: flex;
    border-color: #dae9fc;
    background: #dae9fc;
    border-radius: 5px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // width: 350px;
  }
}
.vr-video {
  // background-color: rgb(59, 18, 18);
  width: 100%;
  min-width: 510px;
  box-shadow: 0px -10px 0px 0px rgba(0, 0, 0, 0), /*上边阴影  透明*/ -10px 0px 0px 0px rgba(0, 0, 0, 0),
    /*左边阴影  透明*/ 10px 0px 0px 0px rgba(0, 0, 0, 0), /*右边阴影  透明*/ 0px 10px 30px 0px rgba(0, 0, 0, 0.1); /*下边阴影 */
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  max-width: 1000px;
  margin: 15px;
  // display: flex;
  flex-direction: row;
  &-header {
    text-align: center;
    font-size: 25px;
    margin-bottom: 5px;
  }

  .text {
    text-align: center;
    font-size: 15px;
  }
}
</style>

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

onMounted(async () => {
  const canvas = document.getElementById(props.streamName)
  const player = new JSMpeg.Player(`ws://${document.domain ? document.domain : "127.0.0.1"}:8082/` + props.streamName, {
    canvas: canvas
  })
})
onActivated(async () => {})
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
  max-width: 1400px;
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

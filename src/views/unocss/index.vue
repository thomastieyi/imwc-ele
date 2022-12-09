<script lang="ts" setup>
import { useTcpStore } from "@/store/modules/tcp"
import { UEInfo } from "@/utils/MESSAGE/info"
import UdpMsgTip from "@/components/UdpMsgTip/index.vue"
import VideoCard from "@/components/VideoCard/index.vue"
import {
  RpcRequest,
  RpcRequest_ResourceActionEnum,
  RpcResponse,
  SliceInfoCreateMessage,
  SliceInfoGetMessage
} from "@/utils/MESSAGE/action"
import { MoreFilled, Refresh } from '@element-plus/icons-vue'
import { onBeforeUnmount, onMounted, ref } from "vue"
import JSMpeg from "@/utils/jsmpeg"
const res = ref(new Uint8Array())

const activities = [
  {
    content: '发起算力请求 成功',
    timestamp: 'Vivo 算力网络客户端',
    size: 'large',
    type: 'primary',
    icon: Refresh,
  },
  {
    content: '创建算力PDU Sesstion请求 成功',
    timestamp: 'Vivo 算力网络自研终端',
    color: '#0bbd87',
  },
  {
    content: 'AMF/SMF接受请求 成功',
    timestamp: 'Vivo 算力网络',
    size: 'large',
    color: '#0bbd87',
  },
  {
    content: 'CSCF/CS算力调度 成功',
    timestamp: 'Vivo 算力网络',
    type: 'primary',
    hollow: true,
    color: '#0bbd87',
  },
  {
    content: 'SMF/UPF 算力PDU Sesstion创建 成功',
    timestamp: 'Vivo 算力网络',
    color: '#0bbd87',
  },
  {
    content: '算力请求 成功',
    timestamp: 'Vivo 算力网络自研终端',
    color: '#0bbd87',
  },
  {
    content: '实时算力资源 演示',
    timestamp: 'Vivo 算力网络客户端',
    color: '#0bbd87',
  },
]
</script>
<template>
  <div class="app-container">
    <div class="stream">
      <VideoCard stream-name="VR" title="原始码流" />
      <VideoCard stream-name="AI" title="目标检测功能增强（实时算力资源）" />
    </div>
    <div class="bottom">
      <div class="left">
        <UdpMsgTip />
      </div>
      <div class="timeline">
        <el-timeline>
          <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
            :type="activity.type" :color="activity.color" :size="activity.size" :hollow="activity.hollow"
            :timestamp="activity.timestamp">
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <!-- <VideoCard stream-name="VR" title="TEST_VR" /> -->
    <!-- <VideoCard stream-name="preview" title="TEST_preview" /> -->
  </div>
</template>

<style lang="scss" scoped>
.app-container {}

.stream {
  display: flex;

}

.bottom {
  display: flex;
  justify-content: center;
  /*水平主轴居中*/
  // align-items: center;/*垂直交叉轴居中*/
  margin-top: 40px;
  // margin-left: 10px;
}
.left{
  padding-right: 35%;

}
</style>

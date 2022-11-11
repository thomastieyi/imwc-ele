<script lang="ts" setup>
import { useTcpStore } from "@/store/modules/tcp"
import { UEInfo } from "@/utils/MESSAGE/info"
import VideoCard from "@/components/VideoCard/index.vue"
import {
  RpcRequest,
  RpcRequest_ResourceActionEnum,
  RpcResponse,
  SliceInfoCreateMessage,
  SliceInfoGetMessage
} from "@/utils/MESSAGE/action"
import { onBeforeUnmount, onMounted, ref } from "vue"
import JSMpeg from "@/utils/jsmpeg"
const res = ref(new Uint8Array())
</script>
<template>
  <div class="app-container">
    <VideoCard stream-name="AI" title="目标检测功能增强（AI引擎提供）" />
    <!-- <VideoCard stream-name="VR" title="TEST_VR" /> -->
    <!-- <VideoCard stream-name="preview" title="TEST_preview" /> -->
  </div>
</template>

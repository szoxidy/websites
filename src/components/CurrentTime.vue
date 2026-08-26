<template>
  <span id="workBoard">
    <time id="currentTime" :datetime="dateTime">{{ time }}</time>
  </span>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('')
const dateTime = ref('')
let timer: number | undefined

const formatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23'
})

function update() {
  const now = new Date()
  const parts = Object.fromEntries(
    formatter.formatToParts(now).map(({ type, value }) => [type, value])
  )

  time.value = `${parts.year} 年 ${parts.month} 月 ${parts.day} 日 ${parts.hour} : ${parts.minute} : ${parts.second}`
  dateTime.value = now.toISOString()
}

onMounted(() => {
  update()
  timer = window.setInterval(update, 1000)
})

onUnmounted(() => {
  if (timer !== undefined) window.clearInterval(timer)
})
</script>
<style scoped>
#workBoard {
  /* 基础容器样式 */
  display: inline-block;
  padding: 12px 20px;
}

#currentTime {
  /* 时间显示样式 */
  color: #2c3e50;
  font-weight: 500;
}


</style>

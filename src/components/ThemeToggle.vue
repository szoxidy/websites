<template>
  <button
    class="switch-theme"
    type="button"
    :aria-label="isNeon ? '切换到浅色模式' : '切换到深色模式'"
    :title="isNeon ? '切换到浅色模式' : '切换到深色模式'"
    @click="toggleNeon"
  >
    <Sun v-if="isNeon" style="height:  min(8vw, 42px);width: min(8vw, 42px);"/>
    <Moon v-else/>
  </button>
</template>

<script setup lang="ts">
import {applyTheme, hasManual, isNeon, prefersDark, toggleNeon} from '@/composables/useThemeSwitch'
import Sun from '@/assets/images/sun.svg' // 直接当组件
import Moon from '@/assets/images/moon.svg'
import {onMounted, onUnmounted} from 'vue'

/* ----------------------------------------------------------
 * 仅当用户「没手动选过」时，跟随系统明暗变化
 * ---------------------------------------------------------- */
const handleSystemThemeChange = (event: MediaQueryListEvent) => {
  if (!hasManual.value) applyTheme(event.matches, false)
}

onMounted(() => prefersDark.addEventListener('change', handleSystemThemeChange))
onUnmounted(() => prefersDark.removeEventListener('change', handleSystemThemeChange))
</script>

<style scoped lang="scss">
@use "../styles/theme.scss";
</style>

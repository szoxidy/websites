<template>
  <button
    class="switch-theme"
    type="button"
    :aria-label="isNeon ? '切换到浅色模式' : '切换到深色模式'"
    :title="isNeon ? '切换到浅色模式' : '切换到深色模式'"
    @click="toggleNeon"
  >
    <svg
      class="theme-icon"
      :class="isNeon ? 'is-moon' : 'is-sun'"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g class="sun-rays">
        <path class="sun-ray" style="--enter-delay: 0s; --exit-delay: .35s" pathLength="1" d="M50 2V11" />
        <path class="sun-ray" style="--enter-delay: .05s; --exit-delay: .30s" pathLength="1" d="M85 15L78 22" />
        <path class="sun-ray" style="--enter-delay: .10s; --exit-delay: .25s" pathLength="1" d="M98 50H89" />
        <path class="sun-ray" style="--enter-delay: .15s; --exit-delay: .20s" pathLength="1" d="M85 85L78 78" />
        <path class="sun-ray" style="--enter-delay: .20s; --exit-delay: .15s" pathLength="1" d="M50 98V89" />
        <path class="sun-ray" style="--enter-delay: .25s; --exit-delay: .10s" pathLength="1" d="M23 78L16 84" />
        <path class="sun-ray" style="--enter-delay: .30s; --exit-delay: .05s" pathLength="1" d="M11 50H2" />
        <path class="sun-ray" style="--enter-delay: .35s; --exit-delay: 0s" pathLength="1" d="M23 23L16 16" />
      </g>

      <path class="moon-shine" :d="moonPath" />
      <path class="theme-core" :d="activePath">
        <animate
          ref="morphAnimation"
          attributeName="d"
          dur="600ms"
          calcMode="spline"
          keyTimes="0;1"
          keySplines=".22 1 .36 1"
          fill="freeze"
        />
      </path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import {applyTheme, hasManual, isNeon, prefersDark, toggleNeon} from '@/composables/useThemeSwitch'
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from 'vue'

type SvgAnimateElement = SVGElement & { beginElement: () => void }

const sunPath = 'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z'
const moonPath = 'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z'
const activePath = computed(() => isNeon.value ? moonPath : sunPath)
const morphAnimation = ref<SvgAnimateElement | null>(null)

watch(isNeon, async (nextTheme, previousTheme) => {
  await nextTick()

  const animation = morphAnimation.value
  if (!animation) return

  animation.setAttribute('from', previousTheme ? moonPath : sunPath)
  animation.setAttribute('to', nextTheme ? moonPath : sunPath)
  animation.beginElement()
})

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

.theme-icon {
  overflow: visible;
}

.theme-core {
  transform-box: fill-box;
  transform-origin: center;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition:
    fill .3s ease,
    stroke .3s ease,
    transform .6s cubic-bezier(.22, 1.5, .4, 1);
}

.is-sun .theme-core {
  fill: rgba(245, 176, 0, .33);
  stroke: #f5b000;
  transform: rotate(0deg) scale(1);
}

.is-moon .theme-core {
  fill: rgba(79, 164, 255, .33);
  stroke: #4fa4ff;
  transform: rotate(-360deg) scale(2);
}

.sun-rays {
  stroke: #f5b000;
  stroke-width: 6;
  stroke-linecap: round;
}

.sun-ray {
  opacity: 0;
  transform: scale(0);
  transform-box: fill-box;
  transform-origin: center;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition:
    stroke-dashoffset .3s ease-out var(--exit-delay),
    opacity .2s ease-out var(--exit-delay),
    transform .3s ease-out var(--exit-delay);
}

.is-sun .sun-ray {
  opacity: 1;
  transform: scale(1);
  stroke-dashoffset: 0;
  transition-delay: var(--enter-delay);
}

.moon-shine {
  fill: none;
  stroke: #4fa4ff;
  stroke-width: 4;
  opacity: 0;
  stroke-dasharray: 20 1000;
  stroke-dashoffset: 0;
  transform-box: fill-box;
  transform-origin: center;
  transform: scale(2);
}

.is-moon .moon-shine {
  animation: moon-shine .75s linear .1s both;
}

@keyframes moon-shine {
  0% {
    opacity: 0;
    stroke-dashoffset: 0;
    filter: blur(2px);
  }

  15% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    stroke-dashoffset: -100;
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-core,
  .sun-ray {
    transition: none;
  }

  .moon-shine {
    animation: none;
  }
}
</style>

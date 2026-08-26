<template>
  <div id="contain">
    <div class="row">
      <div class="box" v-for="bm in firstHalf" :key="bm.name"
           :style="{ '--glow-color': bm.glowColor ?? defaultGlowColor }">
        <a
          :href="bm.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${bm.name}（新窗口打开）`"
        ></a>
        <div class="icon-sweep-light">
          <img
            v-if="bm.icon"
            class="icon"
            :src="bm.icon"
            :alt="bm.name"
            :id="bm.id"
            width="42"
            height="42"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          >
          <span
            v-else
            class="icon bookmark-sprite"
            :style="getSpriteStyle(bm.spriteIndex)"
            aria-hidden="true"
          ></span>
        </div>
        <p class="url" :title="bm.title ?? bm.name">{{ bm.name }}</p>
      </div>
    </div>
    <div class="row">
      <div class="box" v-for="bm in secondHalf" :key="bm.name"
           :style="{ '--glow-color': bm.glowColor ?? defaultGlowColor }">
        <a
          :href="bm.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${bm.name}（新窗口打开）`"
        ></a>
        <div class="icon-sweep-light">
          <img
            v-if="bm.icon"
            class="icon"
            :src="bm.icon"
            :alt="bm.name"
            width="42"
            height="42"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          >
          <span
            v-else
            class="icon bookmark-sprite"
            :style="getSpriteStyle(bm.spriteIndex)"
            aria-hidden="true"
          ></span>
        </div>
        <p class="url" :title="bm.title ?? bm.name">{{ bm.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

interface Bookmark {
  id?: string
  title?: string
  name: string
  href: string
  icon?: string
  spriteIndex?: number
  glowColor?: string
}

const defaultGlowColor = '#4c8dff'
const bookmarkSpriteUrl = `${import.meta.env.BASE_URL}images/bookmarks.png`

function getSpriteStyle(index = 0) {
  const column = index % 5
  const row = Math.floor(index / 5)

  return {
    backgroundImage: `url("${bookmarkSpriteUrl}")`,
    backgroundPosition: `-${column * 42}px -${row * 42}px`
  }
}

const bookmarks: Bookmark[] = [
  {
    name: 'Google',
    href: 'https://www.google.com/',
    icon: './images/Google.svg',
    glowColor: '#4484f3'
  },
  {
    id: 'ChatGPT',
    name: 'ChatGPT',
    href: 'https://chat.openai.com/',
    icon: './images/ChatGPT.svg',
    glowColor: '#bcbcbc'
  },
  {
    name: 'Claude',
    href: 'https://claude.ai/',
    icon: './images/Claude.svg',
    glowColor: '#d97757'
  },
  {
    name: '哔哩哔哩',
    href: 'https://www.bilibili.com/',
    spriteIndex: 0,
    glowColor: '#f25d8e'
  },
  {
    name: '超星学习通',
    href: 'https://i.chaoxing.com/',
    spriteIndex: 1,
    glowColor: '#d40423'
  },
  {
    name: 'Translate',
    href: 'https://translate.google.com',
    spriteIndex: 2,
    glowColor: '#4c8cf4'
  },
  {
    name: '布谷',
    href: 'https://www.bugutv.vip/',
    spriteIndex: 3,
    glowColor: '#ffb224'
  },
  {
    name: 'Wikipedia',
    href: 'https://zh.wikipedia.org/',
    spriteIndex: 4,
    glowColor: '#a3a3a3'
  },
  {
    id: 'Github',
    name: 'Github',
    href: 'https://github.com/',
    icon: './images/github.svg',
    glowColor: '#6e40c9'
  },
  {
    name: '乐回享',
    href: 'https://8lhx.com/',
    spriteIndex: 5,
    glowColor: '#f3f39f'
  },
  {
    name: 'XDA',
    href: 'https://forum.xda-developers.com/mi-5',
    spriteIndex: 6,
    glowColor: '#f59714'
  },
  {
    title: 'Tencent Cloud',
    name: 'Tencent Cloud',
    href: 'https://cloud.tencent.com/',
    spriteIndex: 7,
    glowColor: '#0098ff'
  },
  {
    name: 'Google Mail',
    href: 'https://mail.google.com/',
    spriteIndex: 8,
    glowColor: '#ff5f52'
  },
  {
    name: 'Youtube',
    href: 'https://m.youtube.com/',
    spriteIndex: 9,
    glowColor: '#ff0000'
  },
  {
    title: 'Tutorial Kart',
    name: 'Tutorial Kart',
    href: 'https://www.tutorialkart.com/',
    spriteIndex: 10,
    glowColor: '#a855f7'
  },
  {
    name: 'LanZou',
    href: 'https://pc.woozooo.com/',
    spriteIndex: 11,
    glowColor: '#a4fc5a'
  },
  {
    name: 'MIUI',
    href: 'https://www.miui.com/',
    spriteIndex: 12,
    glowColor: '#ff6a00'
  },
  {
    name: '酷安',
    href: 'https://www.coolapk.com/',
    spriteIndex: 13,
    glowColor: '#0f9d58'
  },
  {
    name: '菜鸟教程',
    href: 'https://www.runoob.com/',
    spriteIndex: 14,
    glowColor: '#35c946'
  },
  {
    title: 'Android 社区',
    name: 'Android 社区',
    href: 'https://www.androidos.net.cn/',
    spriteIndex: 15,
    glowColor: '#3ddc84'
  },
  {
    name: 'W3schools',
    href: 'https://www.w3school.com.cn/',
    spriteIndex: 16,
    glowColor: '#cc2c34'
  },
  {
    name: '知乎',
    href: 'https://www.zhihu.com/',
    spriteIndex: 17,
    glowColor: '#056de8'
  },
  {
    title: 'Stack Overflow',
    name: 'Stack Overflow',
    href: 'https://stackoverflow.com/',
    spriteIndex: 18,
    glowColor: '#f48024'
  },
  {
    name: 'Vue',
    href: 'https://cn.vuejs.org/',
    spriteIndex: 19,
    glowColor: '#3fb27f'
  }
]

const half = Math.ceil(bookmarks.length / 2)
const firstHalf = computed(() => bookmarks.slice(0, half))
const secondHalf = computed(() => bookmarks.slice(half))
</script>

<style lang="scss" scoped>
#contain {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 25px 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.box {
  --glow-color: #4c8dff;
  position: relative;
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  cursor: pointer;
}

.box > a {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 72px;
  height: 72px;
  border-radius: 16px;
  z-index: 2;
}

.box > a:focus-visible {
  outline: 3px solid var(--glow-color);
  outline-offset: 4px;
}

.icon-sweep-light {
  position: relative;
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 14px;
  background: var(--bookmark-grid-card-bg, #1b1b1b);
  border: 1px solid var(--bookmark-grid-card-border, rgba(38, 38, 38, 0.7));
  transition: transform 0.2s ease;
  overflow: hidden;
  z-index: 0;
}

.icon-sweep-light img.icon {
  width: 42px;
  height: 42px;
  -webkit-user-select: none;
  user-select: none;
  filter: drop-shadow(0 0 0.8rem color-mix(in srgb, var(--glow-color) 40%, transparent))
}

.bookmark-sprite {
  display: block;
  width: 42px;
  height: 42px;
  padding: 0;
  overflow: visible;
  background-repeat: no-repeat;
  background-size: 210px 168px;
  -webkit-user-select: none;
  user-select: none;
  filter: drop-shadow(0 0 0.8rem color-mix(in srgb, var(--glow-color) 40%, transparent));
}

.icon-sweep-light::before {
  content: '';
  position: absolute;
  inset: 12%;
  border-radius: inherit;
  background: var(--glow-color, #4c8dff);
  filter: blur(18px);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: -1;
}

.box:hover .icon-sweep-light {
  transform: translateY(-4px);
}

.box:hover .icon-sweep-light::before {
  opacity: 1;
}

.url {
  color: var(--bookmark-grid-url-color, #e6e6e6);
  font-size: 13px;
}
</style>

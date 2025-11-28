<template>
  <div id="contain">
    <div class="row">
      <div class="box" v-for="bm in firstHalf" :key="bm.name"
           :style="{ '--glow-color': bm.glowColor ?? defaultGlowColor }">
        <a :href="bm.href" target="_blank" rel="noopener noreferrer"></a>
        <div class="icon-sweep-light">
          <img class="icon" :src="bm.icon" :alt="bm.name" :id="bm.id"/>
        </div>
        <p class="url" :title="bm.title">{{ bm.name }}</p>
      </div>
    </div>
    <div class="row">
      <div class="box" v-for="bm in secondHalf" :key="bm.name"
           :style="{ '--glow-color': bm.glowColor ?? defaultGlowColor }">
        <a :href="bm.href" target="_blank" rel="noopener noreferrer"></a>
        <div class="icon-sweep-light">
          <img class="icon" :src="bm.icon" :alt="bm.name"/>
        </div>
        <p class="url" :title="bm.title">{{ bm.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {useAssetPreloader} from '@/composables/useAssetPreloader'

interface Bookmark {
  id?: string
  title?: string
  name: string
  href: string
  icon: string
  glowColor?: string
}

const defaultGlowColor = '#4c8dff'

const bookmarks: Bookmark[] = [
  {
    name: 'Google',
    href: 'https://www.google.com/',
    icon: './Google.svg',
    glowColor: '#4484f3'
  },
  {
    id: 'ChatGPT',
    name: 'ChatGPT',
    href: 'https://chat.openai.com/',
    icon: './ChatGPT.svg',
    glowColor: '#bcbcbc'
  },
  {
    name: 'Claude',
    href: 'https://claude.ai/',
    icon: './Claude.svg',
    glowColor: '#d97757'
  },
  {
    name: '哔哩哔哩',
    href: 'https://www.bilibili.com/',
    icon: './images/BiliBili.png',
    glowColor: '#f25d8e'
  },
  {
    name: '超星学习通',
    href: 'https://i.chaoxing.com/',
    icon: './images/LeaningPass.png',
    glowColor: '#d40423'
  },
  {
    name: 'Translate',
    href: 'https://translate.google.com',
    icon: './images/Translate.png',
    glowColor: '#4c8cf4'
  },
  {
    name: '布谷',
    href: 'https://www.bugutv.vip/',
    icon: './images/CuckooTV.png',
    glowColor: '#ffb224'
  },
  {
    name: 'Wikipedia',
    href: 'https://zh.wikipedia.org/',
    icon: './images/Wikipedia.png',
    glowColor: '#a3a3a3'
  },
  {
    id: 'Github',
    name: 'Github',
    href: 'https://github.com/',
    icon: './github.svg',
    glowColor: '#6e40c9'
  },
  {
    name: '乐回享',
    href: 'https://8lhx.com/',
    icon: './images/HappyEcho.png',
    glowColor: '#f3f39f'
  },
  {
    name: 'XDA',
    href: 'https://forum.xda-developers.com/mi-5',
    icon: './images/XDA.png',
    glowColor: '#f59714'
  },
  {
    title: 'Tencent Cloud',
    name: 'Tencent Cloud',
    href: 'https://cloud.tencent.com/',
    icon: './images/TencentCloudLogo.png',
    glowColor: '#0098ff'
  },
  {
    name: 'Google Mail',
    href: 'https://mail.google.com/',
    icon: './images/Gmail.png',
    glowColor: '#ff5f52'
  },
  {
    name: 'Youtube',
    href: 'https://m.youtube.com/',
    icon: './images/YouTube.png',
    glowColor: '#ff0000'
  },
  {
    title: 'Tutorial Kart',
    name: 'Tutorial Kart',
    href: 'https://www.tutorialkart.com/',
    icon: './images/Tutorial kart.png',
    glowColor: '#a855f7'
  },
  {
    name: 'LanZou',
    href: 'https://pc.woozooo.com/',
    icon: './images/LanZou.png',
    glowColor: '#a4fc5a'
  },
  {
    name: 'MIUI',
    href: 'https://www.miui.com/',
    icon: './images/XiaoMi.png',
    glowColor: '#ff6a00'
  },
  {
    name: '酷安',
    href: 'https://www.coolapk.com/',
    icon: './images/coolapk.png',
    glowColor: '#0f9d58'
  },
  {
    name: '菜鸟教程',
    href: 'https://www.runoob.com/',
    icon: './images/runoob.png',
    glowColor: '#35c946'
  },
  {
    title: 'Android 社区',
    name: 'Android 社区',
    href: 'https://www.androidos.net.cn/',
    icon: './images/Android.png',
    glowColor: '#3ddc84'
  },
  {
    name: 'W3schools',
    href: 'https://www.w3school.com.cn/',
    icon: './images/W3School.png',
    glowColor: '#cc2c34'
  },
  {
    name: '知乎',
    href: 'https://www.zhihu.com/',
    icon: './images/KnowAlmost.png',
    glowColor: '#056de8'
  },
  {
    title: 'Stack Overflow',
    name: 'Stack Overflow',
    href: 'https://stackoverflow.com/',
    icon: './images/StackOverflow.png',
    glowColor: '#f48024'
  },
  {
    name: 'Vue',
    href: 'https://cn.vuejs.org/',
    icon: './images/Vue.png',
    glowColor: '#3fb27f'
  }
]

useAssetPreloader(bookmarks.map((bookmark) => bookmark.icon))

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

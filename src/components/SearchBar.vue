<template>
  <form @submit.prevent="useSearch" class="search_bar">
    <button type="submit" id="search_submit" aria-label="开始搜索">Start</button>

    <span class="search-field">
      <button class="search-icon-button" type="submit" aria-label="开始搜索">
        <svg
          class="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </button>
      <label class="sr-only" for="search_input">搜索内容或网址</label>
      <input
        ref="searchInput"
        v-model="query"
        class="search"
        id="search_input"
        maxlength="2048"
        type="search"
        autocomplete="off"
        autofocus
        enterkeyhint="go"
        spellcheck="false"
        placeholder="请输入内容或网址"
        @keydown.esc.prevent="clearSearch"
      >
      <button
        v-show="query"
        class="search-clear-button"
        type="button"
        aria-label="清除搜索内容"
        title="清除搜索内容"
        @click="clearSearch"
      >
        <svg
          class="clear-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </span>
  </form>
</template>

<script lang="ts" setup>
import {useSearch} from '@/composables/useSearch'
import {nextTick, ref} from 'vue'

const query = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

async function clearSearch() {
  query.value = ''
  await nextTick()
  searchInput.value?.focus()
}
</script>
<style lang="scss" scoped>
.search-field {
  position: relative;
}

.search-icon-button {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 40px;
  padding: 0;
  color: currentColor;
  border: 0;
  background: transparent;
  cursor: var(--normal) !important;
}

.search-icon {
  width: 20px;
  height: 20px;
  opacity: .72;
  pointer-events: none;
}

#search_input {
  box-sizing: border-box;
  width: 100%;
  padding-left: 50px;
  padding-right: 44px;

  &::-webkit-search-cancel-button {
    appearance: none;
    -webkit-appearance: none;
  }
}

.search-clear-button {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: currentColor;
  border: 0;
  background: transparent;
  opacity: .52;
  cursor: var(--click) !important;
  transition: opacity .18s ease;

  &:hover,
  &:focus-visible {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -8px;
    border-radius: 50%;
  }
}

.clear-icon {
  width: 18px;
  height: 18px;
  pointer-events: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

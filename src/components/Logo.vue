<template>
  <figure>
    <a class="logo" href="https://google.com" target="_blank" rel="noopener noreferrer" aria-label="打开 Google">
      <picture>
        <source :srcset="`${baseUrl}images/GoogleLogo.webp`" type="image/webp">
        <img
          class="smaller"
          :src="`${baseUrl}images/GoogleLogo.gif`"
          alt="Google"
          width="192"
          height="108"
          decoding="async"
          fetchpriority="high"
        >
      </picture>
    </a>
  </figure>
</template>

<script lang="ts" setup>
const baseUrl = import.meta.env.BASE_URL
</script>

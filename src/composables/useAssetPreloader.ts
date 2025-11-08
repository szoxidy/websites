import { computed, ref } from 'vue'

export const useAssetPreloader = (urls: readonly string[]) => {
    const loaded = ref(0)
    const total = urls.length

    Promise.allSettled(
        urls.map(url =>
            new Promise(resolve => {
                const img = new Image()
                img.onload = img.onerror = () => {
                    loaded.value++
                    resolve(null)
                }
                img.src = url
            })
        )
    ).then(r => {})

    return {
        loaded,
        total,
        progress: computed(() => total ? loaded.value / total : 1)
    }
}
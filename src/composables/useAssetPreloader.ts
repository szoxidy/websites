import {computed, ref} from 'vue'

interface AssetPreloaderOptions {
    immediate?: boolean
}

const absoluteUrlPattern = /^(https?:)?\/\//i

const toAbsoluteUrl = (url: string): string => {
    if (absoluteUrlPattern.test(url) || typeof window === 'undefined') {
        return url
    }
    return new URL(url, window.location.href).href
}

export const useAssetPreloader = (urls: readonly string[], options: AssetPreloaderOptions = {}) => {
    const total = urls.length
    const loaded = ref(0)
    const isDone = ref(total === 0)
    let task: Promise<void> | null = total === 0 ? Promise.resolve() : null

    const preload = () => {
        if (task) return task

        if (typeof window === 'undefined') {
            isDone.value = true
            task = Promise.resolve()
            return task
        }

        const absoluteUrls = urls.map(toAbsoluteUrl)

        task = Promise.allSettled(
            absoluteUrls.map(
                (url) =>
                    new Promise<void>((resolve) => {
                        const asset = new Image()
                        asset.decoding = 'async'
                        asset.referrerPolicy = 'no-referrer'
                        asset.onload = asset.onerror = asset.onabort = () => {
                            loaded.value += 1
                            resolve()
                        }
                        asset.src = url
                    })
            )
        ).then(() => {
            isDone.value = true
        })

        return task
    }

    if (options.immediate ?? true) {
        preload()
    }

    return {
        preload,
        isDone,
        loaded,
        total,
        progress: computed(() => (total === 0 ? 1 : loaded.value / total))
    }
}

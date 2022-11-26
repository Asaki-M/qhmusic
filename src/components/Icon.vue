<template>
  <image :width="size" :height="size" :src="svgPath"></image>
</template>

<script setup lang="ts">
import listIcon from '../static/icon/list.svg'
import playIcon from '../static/icon/play.svg'
import pauseIcon from '../static/icon/pause.svg'
import nextSongIcon from '../static/icon/next-song.svg'
import randomSongIcon from '../static/icon/random-song.svg'
import repeatSongIcon from '../static/icon/repeat-song.svg'
import { onMounted, ref, toRefs, watch } from 'vue'
interface IconProps {
  iconName: string
  color: string
  size: number
}

const props = defineProps<IconProps>()
const { iconName, color, size } = toRefs(props)
const svgPath = ref<string>()

const getIcon = (name: string) => {
  switch (name) {
    case 'list':
      return listIcon
    case 'play':
      return playIcon;
    case 'pause':
      return pauseIcon;
    case 'next-song':
      return nextSongIcon;
    case 'random-song':
      return randomSongIcon
    case 'repeat-song':
      return repeatSongIcon
    default:
      return ''
  }
}
onMounted(async () => {
  const svg = getIcon(iconName.value)
  svgPath.value = svg
})

watch(iconName, async () => {
  const svg = getIcon(iconName.value)
  svgPath.value = svg
})
</script>

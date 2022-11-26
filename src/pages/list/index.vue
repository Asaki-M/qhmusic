<script setup lang="ts">
import { onDeactivated, ref } from 'vue'
import { onUnload } from '@dcloudio/uni-app'
import { getRandom } from '@/utils'
import YINLINLIST from '@/musicList/yinlin.json'
import Icon from '@/components/Icon.vue'

interface SongProps {
  name: string
  author: string
  url: string
  groups: string[]
}

const songs = ref<SongProps[]>(YINLINLIST)
const currentIndex = ref<number>(getRandom(0, YINLINLIST.length - 1))
const current = ref<SongProps>(YINLINLIST[currentIndex.value])
const isPlaying = ref<boolean>(false)
const playingProcess = ref<string>('')
const audioContext = uni.createInnerAudioContext();

audioContext.onEnded(() => {
  nextMusic()
})

audioContext.onTimeUpdate(() => {
  if (isPlaying) {
    const _process = Math.floor((audioContext.currentTime / audioContext.duration) * 100)
    playingProcess.value = _process + '%'
  }
})

const playAndPauseMusic = () => {
  audioContext.src = current.value.url
  if (!(isPlaying.value)) {
    audioContext.play()
  } else {
    audioContext.pause()
  }

  isPlaying.value = !isPlaying.value
}

const nextMusic = () => {
  currentIndex.value = getRandom(0, YINLINLIST.length - 1)
  current.value = YINLINLIST[currentIndex.value]
  audioContext.src = current.value.url
  audioContext.play()
  isPlaying.value = true
  playingProcess.value = '0%'
}

const playSelectedMusic = (song: SongProps, index: number) => {
  audioContext.stop()
  audioContext.src = ''
  current.value = song
  currentIndex.value = index
  audioContext.src = current.value.url
  audioContext.play()
  isPlaying.value = true
  playingProcess.value = '0%'
}

uni.onAppHide((res) => {
  audioContext.onEnded(() => {
    nextMusic()
  })
})

onDeactivated(() => {
  audioContext.destroy()
})

onUnload(() => {
  audioContext.destroy()
})

</script>

<template>
  <view class="player-bottom-process"></view>
  <view class="player-bottom">
    <image class="player-icon" :class="{ 'active': isPlaying }" src="/static/icon-player.png"></image>
    <view class="name">{{ current.name }}</view>
    <view class="author"> - {{ current.author }}</view>
    <view class="player-control">
      <Icon :size="24" color="#333" :icon-name="`${isPlaying ? 'pause' : 'play'}`" class="player-control-icon"
        @click="playAndPauseMusic"></Icon>
      <Icon :size="24" color="#333" icon-name="next-song" class="player-control-icon" @click="nextMusic"></Icon>
    </view>
  </view>

  <view class="content">
    <view class="item-song" v-for="(song, index) in songs" :class="{ active: index === currentIndex }"
      @click="playSelectedMusic(song, index)">
      <view class="song-number">{{ index + 1 }}</view>
      <view class="name">{{ song.name }}</view>
      <view class="author"> - {{ song.author }}</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
@keyframes playingMusic {
  100% {
    transform-origin: center center;
    transform: rotate(360deg);
  }
}

.player-bottom-process {
  position: fixed;
  bottom: 50px;
  left: 0;
  height: 2px;
  width: v-bind(playingProcess);
  background: linear-gradient(to top right, #2400FF 0, #00FFD1 77%, #00FFD1 100%);
}

.player-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: center;

  .player-icon {
    width: 50px;
    height: 50px;

    &.active {
      animation: playingMusic linear 5s infinite;
    }
  }

  .player-control {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .player-control-icon {
      width: 24px;
      height: 24px;
      margin: 0 5px;
    }
  }


  .name {
    font-size: 14px;
  }

  .author {
    font-size: 12px;
    color: #777;
    padding-left: 4px;
  }

}

.content {
  box-sizing: border-box;
  padding-bottom: 50px;
  background-color: #eee;

  .item-song {
    display: flex;
    align-items: center;
    height: 50px;

    &.active {
      $color1: rgba(#00FFD1, 0.3);
      $color2: rgba(#00E1E6, 0.3);
      $color3: rgba(#00C1EF, 0.5);
      background: linear-gradient(to right, $color1 10%, $color2 50%, $color3 100%);
      border-radius: 20px;
    }

    .song-number {
      width: 50px;
      color: $uni-text-color-grey;
      text-align: center;
    }

    .name {
      padding-left: 20px;
      font-size: 14px;
    }

    .author {
      font-size: 12px;
      color: #777;
      padding-left: 4px;
    }
  }
}
</style>

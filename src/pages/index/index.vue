<template>
  <view class="container">
    <view class="container-background"></view>
    <view class="songs-list">
      <image class="item" src="/static/yinlin.webp" @click="() => naviItemDetail('yinlin')">
      </image>
      <!-- <image class="item" src="/static/lanyin.webp" @click="() => naviItemDetail('lanyin')">
      </image>
      <view class="item"></view> -->
    </view>
  </view>
</template>

<script setup lang="ts">
const naviItemDetail = (name: string) => {
  uni.navigateTo({
    url: `/pages/list/index?name=${name}`
  })
}
</script>

<style scoped lang="scss">
@keyframes backgroundAnimate {
  0% {
    transform: translateY(30%);
  }

  50% {
    transform: translateY(50%);
  }

  100% {
    transform: translateY(30%);
  }
}

.container {
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  .songs-list {
    width: 90%;
    margin: 50px auto 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .item {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      box-shadow: 0px 131px 37px rgba(137, 128, 128, 0.01), 0px 84px 33px rgba(137, 128, 128, 0.05), 0px 47px 28px rgba(137, 128, 128, 0.18), 0px 21px 21px rgba(137, 128, 128, 0.31), 0px 5px 11px rgba(137, 128, 128, 0.36), 0px 0px 0px rgba(137, 128, 128, 0.37);
    }
  }

  .container-background {
    width: 90%;
    height: 50%;
    border-radius: 50%;
    position: fixed;
    bottom: 0;
    transform: translateY(30%);
    filter: blur(100px);
    background: linear-gradient(to top, #2400FF 0, #00FFD1 77%, #00FFD1 100%);
    animation: backgroundAnimate 5s infinite;
  }
}
</style>

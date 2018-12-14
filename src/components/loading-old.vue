<style lang="less" scoped>
  @import "../assets/less/config";
  .loading-box {
  .msg {
      line-height: 70px;
      text-align: center;
      font-size: 14px;
    }
  }


  .loading-start {
    margin:0 auto;
    position: absolute;
    z-index: 1;
    animation: rotate-forever 1s infinite linear;
    height: 30px;
    width: 30px;
    left:50%;
    border: 4px solid @main;
    border-right-color: transparent;
    border-radius: 50%;

    
    .msg {
      display: none;
    }
  }

  @keyframes rotate-forever {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
<template>
  <div class="loading-box">
    <div :class="!complete ? 'loading-start' : 'msg'">
      {{ complete ? '' : '' }}
    </div>
  </div>
</template>
<script>
  import isSeeing from 'is-seeing'
  export default {
    props: {
      complete: { // 是否加载完成
        type: Boolean,
        default: false
      },
      loading: { // 是否在请求中
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        state: this.loading
      }
    },
    mounted () {
      this.timer = setInterval(() => {
      	  this.state = true
        // if (isSeeing(this.$el) && !this.state) {
        //   this.state = true
        //   this.$emit('seeing')
        // }
      }, 300)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    watch: {
      loading (to) {
        this.state = to
      }
    }
  }

</script>

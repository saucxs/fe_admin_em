<template>
  <svg @click='click' t="1545299522533" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
       xmlns="http://www.w3.org/2000/svg" p-id="8525" xmlns:xlink="http://www.w3.org/1999/xlink" :fill='fill' :width="width" :height="height">
    <path d="M756.7 343.3L588 512l168.7 168.7 68.4-68.4c9.2-9.8 20.3-12 33.3-6.7 12.4 5.4 18.5 14.7 18.5 28.1v212.9c0 8.2-3 15.4-9 21.3-6 6-13.2 9-21.3 9h-213c-13.3 0-22.7-6.3-28.1-19-5.4-12.4-3.2-23.3 6.7-32.8l68.4-68.4L512 588 343.3 756.7l68.4 68.4c9.8 9.5 12 20.3 6.7 32.8-5.4 12.7-14.7 19-28.1 19H177.5c-8.2 0-15.4-3-21.3-9-6-6-9-13.2-9-21.3V633.8c0-13.3 6.3-22.7 19-28.1 12.4-5.4 23.3-3.2 32.8 6.7l68.4 68.4L436 512 267.2 343.3l-68.4 68.4c-6 6-13.2 9-21.3 9-3.8 0-7.6-0.8-11.4-2.4-12.7-5.4-19-14.7-19-28.1V177.5c0-8.2 3-15.4 9-21.3 6-6 13.1-9 21.3-9h212.9c13.3 0 22.7 6.3 28.1 19 5.4 12.4 3.2 23.3-6.7 32.8l-68.4 68.4L512 436l168.7-168.7-68.4-68.4c-9.8-9.5-12.1-20.3-6.7-32.8 5.4-12.7 14.7-19 28.1-19h212.9c8.2 0 15.4 3 21.3 9 6 6 9 13.2 9 21.3v212.9c0 13.3-6.2 22.7-18.5 28.1-4.1 1.6-8.1 2.4-11.9 2.4-8.2 0-15.4-3-21.3-9l-68.5-68.5z" p-id="8526" fill="#ffffff"></path>
  </svg>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'screenful',
  props: {
    width: {
      type: Number,
      default: 22
    },
    height: {
      type: Number,
      default: 22
    },
    fill: {
      type: String,
      default: '#48576a'
    }
  },
  data () {
    return {
      isFullscreen: false
    }
  },
  methods: {
    click () {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style scoped>
.screenfull {
  display: inline-block;
  cursor: pointer;
  vertical-align: -0.15em;
  color: #fff;
}
</style>

<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path"
      @contextmenu.prevent.native="openMenu(tag, $event)">
      <el-tag :closable="true" :type="isActive(tag.path)?'':'info'" @close='closeViewTabs(tag, $event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeViewTabs(selectedTag, $event)">关闭</li>
      <li @click="closeOthersTags($event)">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.app.visitedViews.slice(-10)
    }
  },
  methods: {
    closeViewTabs (view, $event) {
      this.$store.dispatch('app/delVisitedViews', view).then(views => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    closeOthersTags ($event) {
      this.$router.push(this.selectedTag.path)
      this.$store.dispatch('app/delOthersViews', this.selectedTag).then(() => {
        // $event.preventDefault()
      })
    },
    closeAllTags () {
      this.$store.dispatch('app/delAllViews')
      this.$router.push('/')
    },
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    addViewTabs () {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('app/addVisitedViews', route)
    },
    isActive (path) {
      return path === this.$route.path
    },
    openMenu (tag, e) {
      this.visible = true
      this.left = e.clientX - 180
      this.top = e.clientY
      this.selectedTag = tag
    },
    closeMenu () {
      this.visible = false
    }
  },
  watch: {
    $route () {
      this.addViewTabs()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .tabs-view {
      margin-left: 10px;
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      line-height: 15px;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

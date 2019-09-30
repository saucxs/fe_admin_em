<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <headerbar></headerbar>
    <div class="content-box">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <app-main></app-main>
        <footerbar></footerbar>
      </div>
    </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar, AppMain, Headerbar, Footerbar } from 'view/common/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Headerbar,
    Footerbar
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="scss">
@import "~assets/scss/mixin.scss";
.hideSidebar {
  .sidebar-container{
    width:46px !important;
    overflow: inherit;
  }
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 1920px;
  .content-box{
    height: calc(100% - 46px);
    width: 100%;
    margin: auto;
    display: flex;
    .sidebar-container {
      transition: width 0.28s ease-out;
      width: 208px;
      height: 100%;
      overflow: auto;
      border-right: 1px solid #e6e6e6;
      &::-webkit-scrollbar {display:none}
    }
    .main-container {
      min-height: 100%;
      height: calc(100% - 46px);
      width: 100%;
      overflow: auto;
      transition: margin-left 0.28s ease-out;
    }
  }
}
</style>

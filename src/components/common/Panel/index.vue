<template>
  <div class="panel">
    <div class="card-panel-icon-wrapper icon-demand">
      <svg-icon icon-class="list" class-name="card-panel-icon" />
    </div>
    <span class="panel-title">{{ title }}</span>
    <div class="toolbars">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'panel',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.panel {
  $panelHeight: 40px;
  height: $panelHeight;
  width: 100%;
  // background: rgb(42, 89, 136);
  background:steelblue;
  color: white;
  position: relative;
  /**
  &:before {
    content: '';
    background: #409EFF;
    width: 5px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
  }**/
  .card-panel-icon-wrapper {
    float: left;
    padding: 11px 5px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .panel-title {
    font-size: 20px;
    margin-left: 5px;
    font-family: bold;
    vertical-align: middle;
    height: $panelHeight;
    line-height: $panelHeight;
  }
  .toolbars {
    margin-right : 5px;
    position: absolute;
    vertical-align: middle;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    > :nth-child(n):not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>

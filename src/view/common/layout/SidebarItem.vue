<template>
  <div class='menu-wrapper'>
    <template v-for="(item, key) in routes">

      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path" :key="key">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span>{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-if="!item.noDropdown&&!item.hidden" :index="item.name" :key=key>
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span>{{item.name}}</span>
        </template>
        <template v-for="(child, childIndex) in item.children" v-if='!child.hidden'>

          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]' :key="childIndex"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="childIndex">
            <el-menu-item :index="item.path+'/'+child.path">
              <!-- <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg> -->
              <span>{{child.name}}</span>
            </el-menu-item>
          </router-link>

        </template>

      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

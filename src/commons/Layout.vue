<template>
  <div id="layout">
    <el-menu mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">
          IKunDefined Blog CMS
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <a href="http://localhost:3000">Blog Index</a>
      </el-menu-item>
    </el-menu>
    <container>
      <el-aside class="aside">
        <el-menu class="nav">
          <el-submenu index="1">
            <template slot="title">用户管理</template>
            <el-menu-item index="1-1">
              <router-link to="/user/userlist">
                用户列表
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">分类管理</template>
            <el-menu-item index="2-1">
              <router-link to="/category/categorylist">
                分类列表
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">内容管理</template>
            <el-menu-item index="3-1">
              <router-link to="/content/contentlist">
                内容列表
              </router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/content/contentadd">
                添加内容
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">动态管理</template>
            <el-menu-item index="4-1">
              <router-link to="/dynamic/dynamiclist">
                动态列表
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">留言管理</template>
            <el-menu-item index="5-1">
              <router-link to="/message/messagelist">
                留言列表
              </router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main >
        <router-view></router-view>
      </el-main>
    </container>
  </div>
</template>

<script>
import { Container, Header, Aside, Main, Menu, MenuItem, Submenu } from 'element-ui'

export default {
  components: {
    Container,
    'el-header': Header,
    'el-aside': Aside,
    'el-main': Main,
    'el-menu': Menu,
    'el-menu-item': MenuItem,
    'el-submenu': Submenu
  }
}
</script>

<style scoped>
#layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav {
  height: 100%;
}
</style>

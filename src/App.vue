<template>
  <v-app>
    <v-app-bar app color="#092940" flat dark height="58">
      <div class="d-flex align-center">
        <v-img
          alt="Kexie Logo"
          class="shrink mr-2"
          contain
          :src="logo"
          transition="scale-transition"
          width="50"
        />
        <div class="text-h5">科协招新</div>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        class="d-none d-sm-flex mr-2"
        v-for="(item,index) in navItems"
        :key="index"
        :to="item.link"
      >{{item.name}}</v-btn>
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer=!drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app disable-resize-watcher right v-model="drawer" dark>
      <v-list>
        <v-list-item
          link
          v-for="(item,index) in navItems"
          :key="index"
          :to="item.link"
        >{{item.name}}</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-0" style="min-height:calc(100vh - 181px)">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
      <v-footer dark padless width="100%">
        <v-card flat tile width="100%" class="text-center" color="#092940">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} —
            <strong>计算机与信息安全学院大学生科技协会</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import logo from '@/assets/logo.jpg'
export default {
  name: 'App',
  data: () => ({
    logo,
    drawer: false,
    navItems: [
      {
        name: '首页',
        link: '/',
      },
      {
        name: '报名',
        link: 'sign-up',
      },
      {
        name: '查看',
        link: 'check',
      },
      {
        name: '管理',
        link: 'admin',
      },
    ],
    icons: ['mdi-github', 'mdi-sina-weibo', 'mdi-wechat', 'mdi-qqchat'],
  }),
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
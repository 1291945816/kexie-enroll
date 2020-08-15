<template>
  <v-app>
    <v-app-bar app color="#092940" dark height="58">
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

    <v-navigation-drawer app disable-resize-watcher right v-model="drawer">
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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import logo from '@/assets/logo.jpg'
export default {
  name: 'App',

  components: {},

  data: () => ({
    logo,
    drawer: false,
    navItems: [
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
  }),
}
</script>

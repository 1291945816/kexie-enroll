<template>
  <v-app id="app">
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
      <!-- main -->
      <div id="bg"></div>

      <v-container fluid class="main-container pa-0">
        <transition name="fade" mode="out-in">
          <router-view class="main-view"></router-view>
        </transition>

        <!-- footer -->
        <v-footer
          dark
          padless
          width="100%"
          class="footer"
          :color="$route.path==='/'?'transparent':'#092940'"
        >
          <v-card
            flat
            tile
            width="100%"
            class="text-center"
            :color="$route.path==='/'?'transparent':'#092940'"
          >
            <v-card-text>
              <v-btn
                class="mx-4 white--text"
                icon
                @click="openNewTab('https://github.com/sanyuankexie')"
              >
                <v-icon size="24px">mdi-github</v-icon>
              </v-btn>
              <v-btn
                class="mx-4 white--text"
                icon
                @click="openNewTab('https://kexieoj.kilig.ink/')"
              >
                <v-icon size="24px">mdi-bug</v-icon>
              
              </v-btn>
              <v-btn
              class="mx-4 white--text"
              icon
              @click="openNewTab('https://space.bilibili.com/673693349?spm_id_from=333.788.b_765f7570696e666f.1')"
            >
            <v-icon>{{ bilibili }}</v-icon>
            </v-btn>

              <v-dialog v-model="weChatDialog" width="375">
                <template #activator="{on, attrs}">
                  <v-btn class="mx-4 white--text" icon v-on="on" v-bind="attrs">
                    <v-icon size="24px">mdi-wechat</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-img :src="require('@/assets/WeChatQR.jpg')"></v-img>
                </v-card>
              </v-dialog>

              <v-dialog v-model="qqDialog" width="375">
                <template #activator="{on, attrs}">
                  <v-btn class="mx-4 white--text" icon v-on="on" v-bind="attrs">
                    <v-icon size="24px">mdi-qqchat</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-img :src="require('@/assets/qqQR.jpg')"></v-img>
                </v-card>
              </v-dialog>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text d-inline-block text-truncate" style="min-width:320px">
              {{ new Date().getFullYear() }} —
              <span>计算机与信息安全学院大学生科技协会</span>
            </v-card-text>
          </v-card>
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Net from 'vanta/dist/vanta.net.min'
import * as THREE from 'three'
import { mdiAlphaBCircle } from '@mdi/js'
import logo from '@/assets/logo.jpg'
export default {
  name: 'App',
  data: () => ({
    logo,
    drawer: false,
    weChatDialog: false,
    bilibili:mdiAlphaBCircle,
    qqDialog: false,
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
  }),
  methods: {
    openNewTab(url) {
      window.open(url)
    },
  },
  mounted() {
    this.vantaEffect = Net({
      el: '#bg',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: '#80deea',
      backgroundColor: '#092940',
      THREE,
    })
  },
}
</script>

<style scoped>
#app {
  min-width: 320px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#bg {
  height: calc(100vh - 59px);
}
.main-container {
  position: absolute;
  top: 0;
  min-height: calc(100vh - 59px);
}
.main-view {
  padding-bottom: 129px;
}
.footer {
  position: absolute;
  bottom: 0;
}
</style>
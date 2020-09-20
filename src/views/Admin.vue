<template>
  <div>
    <v-card class="mx-auto rounded-lg" max-width="960px" flat v-if="!success">
      <v-card-title class="text-subtitle-1 font-weight-light">查看、管理所有人的报名信息</v-card-title>
      <v-form lazy-validation ref="AdminForm">
        <v-container fluid class="pa-4">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                label="授权码"
                validate-on-blur
                filled
                :rules="[required]"
                :type="show? 'text':'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                v-model="auth_code"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-card-actions class="justify-end">
        <v-btn text @click="reset" color="primary">清空</v-btn>
        <v-btn class="ml-6" @click="submit" color="primary">提交</v-btn>

        <v-dialog v-model="dialog" persistent width="300">
          <!--进度条-->
          <v-card color="#092940" dark v-if="loading">
            <v-card-text>
              请稍等
              <v-progress-linear indeterminate color="cyan lighten-3" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>

          <!--消息框-->
          <v-card v-if="!success&!loading">
            <v-card-title>{{message}}</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog=false">关闭</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>

    <v-container v-else>
      <v-card class="mx-auto rounded-lg pa-3" max-width="960px" flat>
        <v-text-field filled label="搜索" append-icon="mdi-magnify" v-model="search"></v-text-field>
        <v-btn rounded @click="download">
          <v-icon>mdi-download</v-icon>下载Excel表格
        </v-btn>
      </v-card>

      <v-row class="mx-auto" style="max-width:984px" align="center">
        <v-col v-for="(item,index) in TableView" :key="index" cols="6">
          <v-card>
            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">学号</span>
              {{item.user_id}}
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">姓名</span>
              {{item.user_name}}
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">邮箱</span>
              {{item.email}}
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">手机号码</span>
              {{item.phone}}
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">QQ号码</span>
              {{item.qq_number}}
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">部门</span>
              {{item.department}}
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">方向</span>
              {{item.direction}}
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">密码</span>
              {{item.password}}
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">
              <span class="text-h6 mr-4">自我介绍</span>
            </v-card-text>

            <v-card-text class="px-3 py-2 text-body-1">{{item.self_intro}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      auth_code: '',
      show: false,
      message: '',
      dialog: false,
      loading: false,
      success: false,
      search: '',
      table_data: [
        {
          user_id: '1',
          user_name: '456',
          email: '1',
          phone: '1',
          qq_number: '1',
          department: '1',
          direction: '1',
          password: '1',
          self_intro: '这是自我介绍',
        },
      ],
    }
  },
  methods: {
    required(v) {
      return !!v || '必填'
    },
    validate() {
      return this.$refs.AdminForm.validate()
    },
    reset() {
      this.$refs.AdminForm.reset()
    },
    submit() {
      if (this.validate()) {
        this.dialog = true
        this.loading = true
        this.message = ''

        setTimeout(() => {
          this.loading = false
          this.message = '请求超时'
          return
        }, 30000)

        this.$http
          .get('/admin/allApplyUser', { headers: { auth: this.auth_code } })
          .then((res) => {
            if (res.data.code === '200') {
              this.table_data = res.data.data
              this.loading = false
              this.dialog = false
              this.success = true
            } else {
              this.loading = false
              this.message = res.data.message
            }
          })
          .catch((err) => {
            this.loading = false
            this.message = '网络错误，电波无法到达'
            throw err
          })
      }
    },
    download() {
      let anchor = document.createElement('a')
      document.body.appendChild(anchor)
      let file = 'https://kexieoj.kilig.ink/enroll/admin/download'

      let headers = new Headers()
      headers.append('auth', this.auth_code)

      fetch(file, { headers })
        .then((response) => response.blob())
        .then((blobby) => {
          let objectUrl = window.URL.createObjectURL(blobby)

          anchor.href = objectUrl
          anchor.download = '报名表.xlsx'
          anchor.click()

          window.URL.revokeObjectURL(objectUrl)
        })
    },
  },
  computed: {
    TableView: function () {
      console.log('computing')
      if (this.search === '') {
        return this.table_data
      } else {
        let pattern = new RegExp(`${this.search}`)
        return this.table_data.filter((item) => {
          for (var key in item) {
            if (pattern.test(item[key])) {
              return true
            }
          }
        })
      }
    },
  },
}
</script>
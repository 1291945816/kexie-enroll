<template>
  <div>
    <v-card class="mx-auto rounded-lg" max-width="960" flat v-if="!success">
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

    <template v-else>
      <v-card class="mx-3 mx-md-auto rounded-lg pa-3" max-width="960px" flat>
        <v-text-field filled label="搜索" append-icon="mdi-magnify" v-model="search"></v-text-field>
        <v-btn rounded @click="download">
          <v-icon>mdi-download</v-icon>下载Excel表格
        </v-btn>
      </v-card>

      <v-row style="max-width:984px" class="mx-auto" align="stretch">
        <v-col v-for="(item,index) in table" :key="index" cols="12" sm="6">
          <v-card height="100%">
            <v-card-text>
              <div>
                <span class="font-weight-black">学号：</span>
                <span>{{item.user_id}}</span>
              </div>
              <div>
                <span class="font-weight-black">姓名：</span>
                <span>{{item.user_name}}</span>
              </div>
              <div>
                <span class="font-weight-black">邮箱：</span>
                <span>{{item.email}}</span>
              </div>
              <div>
                <span class="font-weight-black">手机号码：</span>
                <span>{{item.phone}}</span>
              </div>
              <div>
                <span class="font-weight-black">QQ号码：</span>
                <span>{{item.qq_number}}</span>
              </div>
              <div>
                <span class="font-weight-black">密码：</span>
                <span>{{item.password}}</span>
              </div>
              <div>
                <span class="font-weight-black">部门：</span>
                <span>{{item.department}}</span>
              </div>
              <div>
                <span class="font-weight-black">方向：</span>
                <span>{{item.direction}}</span>
              </div>
              <div>
                <span class="font-weight-black">自我介绍：</span>
                <span>{{item.self_intro}}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
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
      table: [],
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
              this.table = res.data.data
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
}
</script>
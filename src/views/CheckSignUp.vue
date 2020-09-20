<template>
  <div>
    <v-card class="mx-auto rounded-lg" max-width="960px" flat v-if="!success">
      <v-card-title class="text-subtitle-1 font-weight-light">查看报名信息。</v-card-title>

      <v-form lazy-validation ref="checkForm">
        <v-container fluid class="pa-4">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field label="学号" validate-on-blur filled v-model="id" :rules="IDRules"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="OJ密码（初始）"
                validate-on-blur
                filled
                :rules="[required]"
                :type="show? 'text':'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                v-model="password"
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

    <!--查询之后的信息-->
    <v-card
      class="my-10 mx-auto rounded-lg"
      max-width="960px"
      flat
      :outlined="this.$vuetify.breakpoint.width>960"
      v-else
    >
      <v-card-actions>
        <v-btn @click.stop="success=false" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <span class="ml-3" @click.stop="success=false">返回</span>
      </v-card-actions>
      <v-form class="pa-4">
        <v-text-field label="学号" filled readonly :value="user_data.user_id"></v-text-field>
        <v-text-field label="姓名" filled readonly :value="user_data.user_name"></v-text-field>
        <v-text-field label="电话" filled readonly :value="user_data.phone"></v-text-field>
        <v-text-field label="qq" filled readonly :value="user_data.qq_number"></v-text-field>
        <v-text-field label="部门" filled readonly :value="user_data.department"></v-text-field>
        <v-text-field label="方向" filled readonly :value="user_data.direction"></v-text-field>
        <v-text-field label="密码" filled readonly :value="user_data.password"></v-text-field>
        <v-textarea label="自我介绍" filled readonly :value="user_data.self_intro"></v-textarea>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ChcekSignUp',
  data() {
    return {
      id: '',
      password: '',
      show: false,
      dialog: false,
      loading: false,
      success: false,
      message: '',
      user_data: {
        user_id: '',
        user_name: '',
        email: '',
        phone: '',
        qq_number: '',
        department: '',
        password: '',
        self_intro: '',
        direction: '',
      },
      IDRules: [
        this.required,
        (v) => {
          let pattern = /^20[0-9]{8}$/
          return pattern.test(v) || '学号不合法'
        },
      ],
      pswRules: [(v) => !!v || '必填'],
    }
  },
  methods: {
    required(v) {
      return !!v || '必填'
    },
    validate() {
      return this.$refs.checkForm.validate()
    },
    reset() {
      this.$refs.checkForm.reset()
    },
    submit() {
      if (this.validate()) {
        this.dialog = true
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.message = '请求超时'
          return
        }, 30000)

        this.$http
          .get(`/user/findUser?user_id=${this.id}&password=${this.password}`)
          .then((res) => {
            if (res.data.code === '200') {
              this.loading = false
              this.dialog = false
              this.user_data = res.data.data
              this.success = true
            } else {
              this.loading = false
              this.success = false
              this.message = res.data.message
            }
          })
          .catch((err) => {
            this.loading = false
            this.success = false
            this.message = '网络错误，电波无法到达'
            throw err
          })
      }
    },
  },
}
</script>
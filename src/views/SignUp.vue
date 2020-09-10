<template>
  <div>
    <v-card
      class="mx-auto my-3 rounded-lg"
      max-width="960px"
      flat
      :outlined="this.$vuetify.breakpoint.width>960"
    >
      <v-card-title class="text-subtitle-1 font-weight-light">您的个人信息我们会妥善保存在数据库中。</v-card-title>
      <v-form lazy-validation ref="signUpForm">
        <v-container fluid class="pa-4">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="学号" filled :rules="IDRules" validate-on-blur v-model="id"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field label="姓名" filled :rules="NameRules" validate-on-blur v-model="name"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field label="邮箱" filled :rules="EmailRules" validate-on-blur v-model="email"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="手机号码"
                filled
                :rules="PhoneRules"
                validate-on-blur
                v-model="phone"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field label="QQ号码" filled :rules="QQRules" validate-on-blur v-model="qq"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="OJ初始密码"
                filled
                :rules="PasswordRules"
                hint="最少6个字符，只可使用数字、字母"
                validate-on-blur
                counter
                :type="show1? 'text':'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                v-model="password"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="确认密码"
                filled
                :rules="[required,checkPassword]"
                validate-on-blur
                :type="show2? 'text':'password'"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show2 = !show2"
                v-model="password2"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-select
                label="报名部门"
                filled
                :items="departments_name"
                :rules="[required]"
                validate-on-blur
                v-model="selected_department"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-select
                label="方向"
                filled
                :items="directions"
                :rules="[required]"
                validate-on-blur
                v-model="selected_direction"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="自我介绍"
                filled
                rows="4"
                counter="200"
                :rules="SelfIntroRules"
                validate-on-blur
                v-model="self_intro"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-card-actions class="justify-end">
        <v-btn text @click="reset" color="primary">清空</v-btn>
        <v-btn class="ml-6" @click.stop="submit" color="primary">提交</v-btn>
        <v-dialog v-model="dialog" persistent width="300">
          <!--进度条-->
          <v-card color="#092940" dark v-if="loading">
            <v-card-text>
              请稍等
              <v-progress-linear indeterminate color="cyan lighten-3" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>

          <!--消息框-->
          <v-card flat v-else>
            <v-card-title>{{message}}</v-card-title>
            <v-card-text>{{reason}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.stop="dialog = false">关闭</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  components: {},
  data() {
    return {
      //表单
      id: '',
      name: '',
      phone: '',
      email: '',
      qq: '',
      password: '',
      password2: '',
      dialog: false,
      loading: false,
      message: '',
      reason: '',
      success: false,
      show1: false,
      show2: false,

      //表单规则
      IDRules: [
        this.required,
        (v) => {
          let pattern = /^20[0-9]{8}$/
          return pattern.test(v) || '学号不合法'
        },
      ],
      NameRules: [
        this.required,
        (v) => (v && v.length <= 20) || '你的名字有点太长了吧...',
      ],
      PhoneRules: [
        this.required,
        (v) => {
          let pattern = /^(13[0-9]|14[4|5|7|8]|15[0-9]|16[6|7]|17[1-8]|18[0-9]|19[0-9])\d{8}$/
          return pattern.test(v) || '手机号码不合法'
        },
      ],
      EmailRules: [
        this.required,
        (v) => {
          let pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
          return pattern.test(v) || '邮箱地址不合法'
        },
      ],
      QQRules: [
        this.required,
        (v) => {
          let pattern = /^[1-9][0-9]{4,}$/
          return pattern.test(v) || 'qq号码不合法'
        },
      ],
      PasswordRules: [
        this.required,
        (v) => {
          let pattern = /^[a-zA-Z0-9]{6,18}$/
          return pattern.test(v) || '密码长度在6~18之间，只能包含字母、数字'
        },
      ],
      SelfIntroRules: [
        this.required,
        (v) => (v && v.length <= 200) || '最多200字',
      ],

      //部门
      departments: [
        {
          name: '多媒体部',
          directions: ['网站开发', 'UI方向', '3D建模方向', '视频制作'],
        },
        {
          name: '软件部',
          directions: ['机器学习', 'Android开发', '游戏开发'],
        },
        {
          name: '硬件部',
          directions: ['嵌入式软件', '嵌入式硬件', '电路电子硬件设计'],
        },
        {
          name: '组织部',
          directions: [],
        },
      ],
      selected_department: '',
      selected_direction: '',
      self_intro: '',
    }
  },
  computed: {
    departments_name: function () {
      return this.departments.map((department) => {
        return department.name
      })
    },
    directions: function () {
      let index = this.departments.findIndex((d) => {
        return d.name === this.selected_department
      })
      if (index === -1) {
        return []
      } else if (this.departments[index].name === '组织部') {
        let directions = []
        this.departments.forEach((d) => {
          directions = directions.concat(d.directions)
        })
        return directions
      } else {
        return this.departments[index].directions
      }
    },
  },
  methods: {
    checkPassword() {
      return this.password === this.password2 || '两次输入的密码不一致'
    },
    required(v) {
      return !!v || '必填'
    },
    validate() {
      return this.$refs.signUpForm.validate()
    },
    reset() {
      this.$refs.signUpForm.reset()
    },
    submit() {
      if (this.validate()) {
        this.dialog = true
        this.loading = true
        this.message = ''
        this.reason = ''

        let data = {
          user_id: this.id,
          user_name: this.name,
          email: this.email,
          phone: this.phone,
          qq_number: this.qq,
          department: this.selected_department,
          password: this.password,
          self_intro: this.self_intro,
          direction: this.selected_direction,
        }

        setTimeout(() => {
          this.loading = false
          this.message = '请求超时'
          return
        }, 30000)

        this.$http
          .post('/user/apply', data)
          .then((res) => {
            this.loading = false
            if (res.data.code === '200') {
              this.success = true
              this.message = '报名成功'
            } else {
              this.success = false
              this.message = '报名失败'
              //这里属实恶心
              this.reason = ''
              if (res.data.message0) {
                this.reason += res.data.message0 + '。'
              }
              if (res.data.message1) {
                this.reason += res.data.message1 + '。'
              }
              if (res.data.message2) {
                this.reason += res.data.message2 + '。'
              }
              if (res.data.message3) {
                this.reason += res.data.message3 + '。'
              }
              if (res.data.message4) {
                this.reason += res.data.message4 + '。'
              }
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
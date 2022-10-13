<template>
  <div class="app-container">
    <div class="dashboard-text">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登录账户设置" name="first">
            <el-form ref="empInfoForm" :model="accountInfo" :rules="acountInfoRules" label-width="80px">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountInfo.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updatedInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import UserInfo from '../component/user-info.vue'
import JobInfo from '../component/job-info.vue'
import { getUserBasicInforByidAPI, saveUserDetailById } from '@/api'
export default {
  name: 'Detail',
  components: {
    UserInfo, JobInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'second',
      accountInfo: {},
      acountInfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const res = await getUserBasicInforByidAPI(this.$route.params.id)
      // console.log(res)
      this.accountInfo = res
    },
    async  updatedInfo() {
      try {
        await this.$refs.empInfoForm.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('账户更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      console.log(this.activeName)
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style scoped lang="scss">
.el-form{
  margin: 40px;
}
.el-input{
  width: 30%;
}
</style>

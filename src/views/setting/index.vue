<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="10" :span="6" style="height:60px">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="middle"
              @click="isShowDialog"
            >新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" style="width:100%" stripe border :data="roleList">
            <el-table-column label="序号" width="180" type="index" />
            <el-table-column label="角色" width="240" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作" width="240">
              <template slot-scope="{row}">
                <el-button size="small" type="success" @click="goManagerPermission(row.id)">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRow(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRow(row.id)">删除</el-button></template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-row style="height:80px" type="flex" justify="end" align="middle">
            <el-pagination
              v-if="total > 0"
              background
              layout="prev,pager,next,sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-sizes="[2,4,6]"
              :page-size.sync="page.pagesize"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="true"
          />
          <el-form :model="CompanyInfo" label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="CompanyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="CompanyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="CompanyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="CompanyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <add-role ref="AddRole" :dialog-visible.sync="dialogVisible" @UpdateRoleList="getRoleList" />
    <!-- @updata:dialogvisible 相当于绑定了这个事件 -->
    <ManagerPermission :role-id="roleId" :dialog-visible.sync="ManagerPermissionVisible" />
  </div>
</template>

<script>
import ManagerPermission from './component/ManagerPermission.vue'
import { getRoleListApi, delRoleByIdApi, queryComponeyIdApi } from '@/api'
import AddRole from './component/AddRole.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  components: {
    AddRole, ManagerPermission
  },
  data() {
    return {
      loading: false,
      activeName: 'first',
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10
      },
      roleList: [],
      total: 0, // 记录总数,
      dialogVisible: false,
      CompanyInfo: {},
      ManagerPermissionVisible: false,
      roleId: ''
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleListApi(this.page)
        this.total = total
        this.roleList = rows
        /* 明明有数据，却是最后一页没有数据
        解决方案：total 大于0 并且 rows的length === 0
        这种情况并不是正在的没有数据 是有的，要重新发起请求 */
        if (this.total > 0 && this.roleList.length === 0) {
          this.page.page = this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    isShowDialog() {
      this.dialogVisible = true
    },
    editRow(row) {
      console.log({ ...row })
      console.log(this.$refs.AddRole)
      this.$refs.AddRole.formData = { ...row } // 引用数据类型直接赋值 是地址 共享同一份数据  用...浅拷贝后在赋值
      this.dialogVisible = true
    },
    async delRow(id) {
      try {
        await this.$confirm('确定删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRoleByIdApi(id)
        // 刷新列表
        this.getRoleList()
      } catch (error) {
        // 关闭弹窗
        this.$emit('cancelDialog')
      }
    },
    /* ---公司信息---- */
    async getCompanyInfo() {
      try {
        this.CompanyInfo = await queryComponeyIdApi(this.companyId)
      } catch (error) {
        console.log(error)
      }
    },
    // 分配权限弹层
    goManagerPermission(id) {
      // console.log(id)
      this.roleId = id
      this.ManagerPermissionVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

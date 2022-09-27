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
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
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
        <el-tab-pane label="公司信息" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>
    <add-role :dialog-visible.sync="dialogVisible" @UpdateRoleList="getRoleList" />
    <!-- @updata:dialogvisible 相当于绑定了这个事件 -->
  </div>
</template>

<script>
import { getRoleListApi } from '@/api'
import AddRole from './component/AddRole.vue'
export default {
  name: 'Setting',
  components: {
    AddRole
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
      dialogVisible: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleListApi(this.page)
        this.total = total
        this.roleList = rows
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    isShowDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

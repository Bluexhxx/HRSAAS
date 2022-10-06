<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <TreeTool :tree-node="componeyname" :is-root="false" />
    </el-card>
    <el-tree :data="departs" :props="defaultTreeProps" :default-expand-all="true">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <TreeTool slot-scope="{ data }" :tree-node="data" @addDept="handleDept" @editDept="editDept" />
    </el-tree>
    <AddDept ref="addDept" :dialog-visible.sync="showDialog" :current-node="currentNode" />
  </div>
</template>

<script>
import AddDept from './components/AddDept.vue'
import TreeTool from './components/TreeTool.vue'
import { getDepartmentsApi } from '@/api'
import { tranListToTreeData } from '@/utils'
export default {
  name: 'Department',
  components: {
    TreeTool, AddDept
  },
  data() {
    return {
      defaultTreeProps: {
        children: 'children',
        label: 'name'
      },
      loading: false,
      showDialog: false,
      componeyname: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [],
      currentNode: {} // 存放当前操作的节点
      //  departs: [
      //   { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] }]

    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyName, companyManage } = await getDepartmentsApi()

        this.departs = tranListToTreeData(depts, '')
        this.componeyname = { name: companyName, manager: companyManage }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    handleDept(treeNode) {
      // 显示dept
      this.showDialog = true
      this.currentNode = treeNode
      console.log(treeNode)
    },
    // 编辑
    editDept(treeNode) {
      this.showDialog = true
      this.currentNode = treeNode // 更新当前操作节点
      // 回显数据
      // node 赋值给 addDept formdata
      this.$refs.addDept.formData = { ...treeNode }
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      padding-right: 20px;
    }
  }
}
</style>

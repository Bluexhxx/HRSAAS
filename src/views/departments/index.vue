<template>
  <div class="departments-container">
    <el-card>
      <TreeTool :tree-node="componeyname" :is-root="false" />
    </el-card>
    <el-tree :data="departs" :props="defaultTreeProps" :default-expand-all="true">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <TreeTool slot-scope="{ data }" :tree-node="data" />
    </el-tree>
  </div>
</template>

<script>
import TreeTool from './components/TreeTool.vue'
import { getDepartmentsApi } from '@/api'
export default {
  name: 'Department',
  components: {
    TreeTool
  },
  data() {
    return {
      defaultTreeProps: {
        children: 'children',
        label: 'name'
      },
      componeyname: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [
        // 一行对应一条数据(一个对象)
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }]

    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        const { data } = await getDepartmentsApi()
        this.departs = data
      } catch (error) {
        console.log(error)
      }
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

<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    treeNode: {
      type: Object,
      require: true,
      default: () => ({})
    },
    isRoot: { // isRoot 来控制 编辑部门 和 删除部门 的 显示 隐藏
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // 新增操作
        // 触发告诉父组件显示弹框
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 编辑操作
      } else {
        // 删除操作
      }
    }
  }
}
</script>

<style>

</style>

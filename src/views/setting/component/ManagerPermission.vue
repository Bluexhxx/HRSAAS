<template>
  <el-dialog
    title="分配权限"
    :visible="dialogVisible"
    :before-close="handleClose"
    @open="onOpen"
  >
    <el-tree
      ref="tree"
      :data="treeData"
      show-checkbox
      node-key="id"
      default-expand-all
      highlight-current
      :props="defaultProps"
      :default-checked-keys="defCheckKeys"
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="saveRolePermisson">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { tranListToTreeData } from '@/utils'
import { getPermissionList, getRolesInfo, setRolePermission } from '@/api'
export default {
  name: 'ManagerPermission',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defCheckKeys: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    async onOpen() {
      console.log('@@' + this.roleId)
      try {
        const res = await getPermissionList()
        // 转树形数据
        this.treeData = tranListToTreeData(res, '0')
        this.getRolPermission()
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    async  getRolPermission() {
      const res = await getRolesInfo(this.roleId)
      console.log(res)
      this.defCheckKeys = res.permIds
      console.log(this.defCheckKeys)
    },
    // 保存设设置的权限
    async  saveRolePermisson() {
      const id = this.roleId
      const permIds = this.$refs.tree.getCheckedKeys()
      await setRolePermission({ id, permIds })
      this.$message.success('分配成功')
      this.handleClose()
    }
  }
}
</script>

<template>
  <el-dialog title="分配角色" :visible="visible" @close="onClose" @open="onOpen">
    <!-- 分配角色 label 选中checkbox之后拿到的值 -->
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="item in list"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoles } from '@/api/setting'
import { getUserBasicInforByidAPI, assignRoles } from '@/api/user.js'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      list: [], // 角色列表
      checkList: [],
      loading: false
    }
  },
  created() {

  },
  methods: {
    //  获取所有角色渲染
    async onOpen() {
      try {
        const { rows } = await getRoles()
        this.list = rows
        this.getEmployeesRoles()
      } catch (e) {
        console.log(e)
      }
    },
    async getEmployeesRoles() {
      const res = await getUserBasicInforByidAPI(this.roleId)
      this.checkList = res.roleIds || []
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    async  confirm() {
    //  点击确定触发分配角色
      try {
        await assignRoles({ id: this.roleId, roleIds: this.checkList })
        this.$message.success('分配成功')
        this.onClose()
      } catch (error) {
        this.$message.error('分配失败')
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <el-dialog
    title="新增角色"
    width="30%"
    :visible="dialogVisible"
    @close="cancelDialog"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formData"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{required: true,message: '角色必填',trigger: 'blur'}]"
      >
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formData.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button v-loading="loading" @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRoleApi } from '@/api'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
    cancelDialog() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        // 校验成功后
        this.loading = true
        await addRoleApi(this.formData)
        this.$emit('UpdateRoleList')
        // 提示消息
        this.$message.success('添加成功！')
        // 关闭dialog
        this.cancelDialog()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

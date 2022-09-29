<template>
  <el-dialog
    :title="title"
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
import { addRoleApi, updateRoleByIdApi } from '@/api'
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
  computed: {
    title() {
      return this.formData.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    cancelDialog() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formData = { // 关闭的时候清空表单里的数据
        name: '',
        description: ''
      }
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        // 校验成功后
        this.loading = true
        // 区分是新增还是编辑功能
        this.formData.id ? await updateRoleByIdApi(this.formData) : await addRoleApi(this.formData)
        this.$message.success(this.formData.id ? '更新成功！' : '添加成功')
        this.$emit('UpdateRoleList')

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
<style lang="scss" scoped>
  .el-dialog {
    // 设置过渡，出现与消失的动画是靠过渡实现的
    transition: all 0.3s;
  }
</style>

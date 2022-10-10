<template>
  <el-dialog title="新增员工" :visible="addEmpvisible" @close="handleClose">
    <!-- 表单 -->
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:80%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree
          v-show="showTree"
          v-loading="loading"
          :data="treeData2"
          :props="{label:'name'}"
          default-expand-all
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" @click="submit">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
// 实现弹窗组件的显示和隐藏
import { tranListToTreeData } from '@/utils'
import employees from '@/api/constant/employees'
import { getDepartmentsApi, addEmployeeApi } from '@/api'
export default {
  name: 'AddEmployees',
  props: {
    addEmpvisible: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },

      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },

      hireType: employees.hireType,
      treeData: [{ name: '行政部', manager: '刘备' }],
      showTree: false, // 树组件显示隐藏
      loading: false
    }
  },
  computed: {
    treeData2() {
      return this.treeData
    }
  },
  methods: {
    // 取消的时候 一般会做3件事
    // 1. 表单校验结果的重置
    // 2. formData 数组的重置
    // 3. 改变父组件的值
    handleClose() {
      this.$refs.addEmployee.resetFields() // 重置校验结果
      this.$emit('update:addEmpvisible', false)
    },
    async getDepartments() {
      this.loading = true
      const { depts } = await getDepartmentsApi()
      this.treeData = tranListToTreeData(depts, '')
      this.showTree = true // 显示树
      this.loading = false
    },
    selectNode(node) {
      // console.log(node)
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async submit() {
      // 表单验证通过之后，调用新增接口
      // 调用新增接口成功，刷新 员工列表
      try {
        await this.$refs.addEmployee.validate()
        await addEmployeeApi(this.formData)
        this.$parent.getEmployeeList() // 调用父级方法获取最新列表
        // 添加成功关闭
        this.$message.success('新增员工成功！')
        this.handleClose()
      } catch (error) {
        console.log(error)
      }
      // 关闭弹窗
    }
  }
}
</script>

<style />

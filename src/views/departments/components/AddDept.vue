<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="dialogVisible" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option label="username11" value="username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
/*
完成新增表单的基本校验条件
部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门
部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复
部门负责人（manager）：必填
部门介绍 ( introduce)：必填 1-300个字符
*/
import { getDepartmentsApi } from '@/api'
export default {
  name: 'AddDept',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      require: true,
      default: () => ({})
    }
  },
  data() {
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentsApi()
      // console.log(depts)
      const isRepate = depts.some(ele => ele.code === value)
      isRepate ? callback(new Error(`模块下已存在${value}编码`)) : callback()
    }

    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartmentsApi()
      // 找同级部门
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      console.log('dept', isRepeat)
      isRepeat ? callback(new Error(`模块下已存在${value}名称`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [
          { required: true, message: '部门管理者必填', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {

  },
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法集合
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>

</style>

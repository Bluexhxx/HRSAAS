<template>
  <div>
    <div class="app-container">
      <PageTools>
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/Import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportExcle">导出</el-button>
          <el-button size="small" type="primary" @click="handelAddEmp">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <el-table-column label="序号" sortable="" width="80" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatEmployment" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <!-- 作用域插槽 -->
            <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next, sizes"
            :current-page.sync="page.page"
            :page-size.sync="page.size"
            :page-sizes="[2,5,10]"
            :total="total"
            @current-change="getEmployeeList"
            @size-change="getEmployeeList"
          />
        </el-row>
      </el-card>
      <!-- 新增员工弹窗 -->
      <AddEmployees :add-empvisible.sync="addEmpvisible" />
    </div>

  </div>
</template>

<script>
// import UploadExcel from '@/components/UploadExcel'
import { getEmployeeListApi, delEmployeeApi } from '@/api'
import EmpConstData from '@/api/constant/employees'
import AddEmployees from './component/AddEmployees.vue'
// console.log(EmpConstData)
// import PageTools from '@/components/PageTools'
export default {
  name: 'Employees',
  components: {
    // PageTools
    AddEmployees
  },
  data() {
    return {
      loading: false,
      page: {
        page: 1, // 当前页码
        size: 10
      },
      list: [], // 接数据的
      total: 0, // 总数
      hireType: EmpConstData.hireType, // [{id: 1,value: '正式'},{id: 2,value: '非正式'}]
      addEmpvisible: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeListApi(this.page)
        this.total = total
        this.list = rows
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    formatEmployment(row, column, cellValue, index) {
      // 要去找 1所对应的值
      const obj = this.hireType.find(item => item.id === cellValue)
      // return obj ? obj.value : '未知'
      return obj && obj.value || this.hireType[1].value
    },
    handelAddEmp() {
      // 打开弹窗
      this.addEmpvisible = true
    },
    async deleteEmployee(id) {
      try {
        await this.$confirm('确认删除该员工吗？', '提示', {
          type: 'warning'
        })
        await delEmployeeApi(id) // 请求
        this.$message.success('删除成功')
        this.getEmployeeList() // 刷新列表
      } catch (error) {
        console.log(error)
      }
    },
    // 导出excle
    async exportExcle() {
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExcelMapPath)
      // console.log('export')
      // 该功能使用次数比较少 使用文件懒加载的方式 在点击的时候触发加载文件
      // import() 当做方法使用 返回的是promise
      // 相当于原来的按需引入 import {export_json_to_excel} from '@/vendor/Export2Excel.js'
      const { export_json_to_excel } = await import('@/vendor/Export2Excel.js')
      // 获取所有的员工数据
      const { rows } = await getEmployeeListApi({ page: 1, size: this.total })
      console.log(rows)
      // 处理数据格式
      const data = rows.map((item) => { // map 表头能返回 顺序对应，长度相同的新数组
        return header.map((h) => { // 确定每个数组内的内容 根据映射表先取出英文的key 然后去拿数据
        // 判断聘用形式
          if (h === '聘用形式') {
            // 判断是聘用形式 就用find查找到那一项
            const find = this.hireType.find((hireType) => {
              return hireType.id === item[exportExcelMapPath[h]]
            })
            return find ? find.value : '未知'
          }
          // console.log(item[exportExcelMapPath[h]])
          return item[exportExcelMapPath[h]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        // 一个数组就是一行数据
        data, // 具体数据 必填
        filename: 'excel-list', // 导出文件名
        autoWidth: true, // 单元格是否要自适应宽度
        bookType: 'xlsx' // 导出文件类型
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

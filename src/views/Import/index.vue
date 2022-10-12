<template>
  <!-- 公共导入组件 -->
  <UploadExcel :before-upload="beforeUploadFn" :on-success="onSuccessFn" />
</template>
<script>
import { importEmployeeApi } from '@/api'
export default {
  name: 'Import',
  methods: {
    async onSuccessFn({ header, results }) {
      // console.log('data', data)
      // 拿到数据 写具体业务逻辑
      const arr = this.importData(header, results)
      console.log(arr)
      await importEmployeeApi(arr) // 调用导入接口
      this.$message.success('导入成功')
      this.$router.back()
    },
    beforeUploadFn(file) {
      // 拿到文件在上传前校验文件大小 格式。。
      console.log('file', file)
      if (file.size > 10240) { // 1024byte*10 =10kb
        this.$message.error('to Big')
        return false
      }
      return true
    },
    importData(header, results) {
      // header  ['手机号', '姓名', '入职日期', '转正日期', '工号']
      // results  [{ '入职日期': 43678, '姓名': '高大山', '工号': 20089, '手机号': 13041131879, '转正日期': 43678 }]
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // const arr = []
      // results.forEach(item => {
      //   const userInfo = {}
      //   Object.keys(item).forEach(key => {
      //     userInfo[userRelations[key]] = item[key]
      //   })
      //   arr.push(userInfo)
      // })
      // return arr

      // 数组转数组用map的方法,会生成一个新数组
      const data = results.map(obj => {
        const zhobj = {}// 定义一个空对象来装东西
        // Object.keys(obj)之后会获得一个数组
        // 数组为['入职日期','手机号','姓名',....]
        Object.keys(obj).forEach(zhkey => {
          // 再把上面的数组循环,利用mapInfo的value值获取需要的英文key
          const enkey = userRelations[zhkey]
          // 把定义的空对象的key设为英文key,把空对象的value值定义为原来对象的value值,返回结果
          zhobj[enkey] = obj[zhkey]
        })
        return zhobj
      })

      return data
    }
  }
}
</script>

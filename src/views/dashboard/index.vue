<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <UploadExcel :before-upload="beforeUploadFn" :on-success="onSuccessFn" /> -->
    <!-- <svg-icon iconClass="eye-open"></svg-icon> 测试-->
    <UploadImg @on-success="onSuccess1" />
    <UploadImg @on-success="onSuccess2" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    // 图片上传第一次成功回调函数
    onSuccess1() {
      console.log(111)
    },
    onSuccess2() {
      console.log(111)
    }
  //   onSuccessFn(data) {
  //     console.log('data', data)
  //     // 拿到数据 写具体业务逻辑
  //   },
  //   beforeUploadFn(file) {
  //     // 拿到文件在上传前校验文件大小 格式。。
  //     console.log('file', file)
  //     if (file.size > 10240) { // 1024byte*10 =10kb
  //       this.$message.error('to Big')
  //       return false
  //     }
  //     return true
  //   }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

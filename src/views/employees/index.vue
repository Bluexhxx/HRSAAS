<template>
  <div>
    <PageTools type="success" :is-show-before="true">
      <template #before>
        <span>共25条记录</span>
      </template>
      <!-- # 是v-slot: 的缩写 -->
      <template v-slot:after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </PageTools>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
export default {
  name: 'HrsaasIndex',
  components: {
    // PageTools
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

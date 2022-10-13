<template>
  <div>
    <el-upload
      class="elUpload"
      action="#"
      list-type="picture-card"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :http-request="httpRequest"
      :before-upload="beforeUplaod"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 图片预览弹层 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewImgDialogVisible"
    >
      <img style="width: 100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImg',
  data() {
    return {
      previewImgUrl: '',
      previewImgDialogVisible: false,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]

    }
  },
  methods: {
    onRemove(fileList) {
      this.fileList = fileList
    },
    onChange(file, filelist) {
      // this.fileList.push(file)
      this.fileList = filelist
    },
    // 上传前校验
    beforeUplaod(file) {
      const requestTypes = ['image/jpeg', 'image/gif', 'image/bmp']
      const isHas = requestTypes.includes(file.type)
      if (!isHas) {
        this.$message.error('上传文件格式不正确，' + '')
        return false
      }
      //  检查大小
      const maxSize = 1 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过1M')
        return false
      }
      return true
    },
    httpRequest() {
      console.log('...')
    },
    onPreview(file) {
      this.previewImgUrl = file.url
      this.previewImgDialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.elUpload{
  // 限制图片上传数量
  width: 148px;
  height: 148px;
  overflow: hidden;
}

</style>

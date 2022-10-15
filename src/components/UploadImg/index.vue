<template>
  <div>
    <el-upload
      v-loading="loading"
      class="elUpload"
      action="#"
      list-type="picture-card"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :http-request="httpRequest"
      :before-upload="beforeUplaod"
      :file-list="fileList"
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
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  // 不推荐写明文 只适合前端调试 应该向后端请求
  SecretId: 'AKID0rc9GE0ZyCD2e4wdx2vb4IH2ZrujK0Ti',
  SecretKey: '3sWxBD1c2HQODtZBtiOvHQM8i7JJDwWt'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loading: false,
      previewImgUrl: '',
      previewImgDialogVisible: false,
      fileList: []

    }
  },
  watch: {
    defaultUrl() {
      // 监视父组件传过来的值 存入filelist
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
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
    httpRequest({ file }) {
      // console.log(file)
      this.loading = true
      cos.putObject({
        Bucket: 'xhxxblue-1314348514', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传失败！')
        this.loading = false
        // 通知父组件上传成功
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
      })
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

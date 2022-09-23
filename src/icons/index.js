import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally

Vue.component('svg-icon', SvgIcon)
// require.context 方法 可以实现批量导入文件
// require.context(directory, useSubdirectories, regExp)
// directory: 要查找的文件路径
// useSubdirectories: 是否查找子目录
// regExp: 要匹配文件的正则
// 返回一个方法 req函数的作用是根据路径 把对应的模块 导入进来 modulesFiles

// 返回的方法具有一个 keys 属性
// keys 函数 返回一个数组
const req = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys().map(requireContext)

// map 返回一个长度相同的新数组
requireAll(req)

// require.context存储的模块资源引用会根据key值找到真正的资源模块，进行require，
// 浏览器会帮助我们下载相应的资源，做到了批量引入后按需加载的想法。

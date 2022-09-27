import request from '@/utils/request'

/**
 * token获取所有角色列表
 * @param {*} page 页码
 * @param {*} pagesize 每页条数
 * @returns Promise
 */
export const getRoleListApi = ({ page, pagesize }) => {
  return request({
    url: '/sys/role',
    params: {
      page, pagesize
    }
  })
}

/**
 * 添加角色
 * @param {string} name 角色名称
 * @param {string} description 角色描述
 * @returns Promise
 */
export const addRoleApi = ({ name, description }) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data: {
      name, description
    }
  })
}

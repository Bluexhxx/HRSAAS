import request from '@/utils/request'
//  获取角色详情
export const getRolesInfo = (id) => {
  return request({
    url: '/sys/role/' + id
  })
}

//  获取角色列表
export const getRoles = () => {
  return request({
    url: '/sys/role/'
  })
}

export const setRolePermission = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}

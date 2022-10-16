import request from '@/utils/request'

export const getUserInfoAPI = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export const getUserBasicInforByidAPI = (userId) => {
  return request({
    url: `/sys/user/${userId}`
  })
}
// resetful
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 * 给用户分配角色
 * ***/
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}

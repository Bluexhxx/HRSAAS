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

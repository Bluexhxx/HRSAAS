import request from '@/utils/request'
/**
 * 获取组织架构数据
 **/
export const getDepartmentsApi = () => {
  return request({
    url: '/company/department'
  })
}

/**
 *  新增部门接口
 *
 * ****/
export function addDepartmentsApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 编辑部门
 *
 * ***/
export function updateDepartmentsAPi(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  根据id根据部门  接口是根据restful的规则设计的   删除 delete  新增 post  修改put 获取 get
 * **/
export function delDepartmentsApi(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
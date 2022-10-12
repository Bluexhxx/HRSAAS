import Layout from '@/layout'

export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: '/employees/detail/:id?',
      name: 'Detail',
      hidden: true,
      component: () => import('@/views/employees/detail')
    }
  ]
}

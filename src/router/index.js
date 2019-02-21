import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/commons/Layout'
import UserList from '@/components/User/UserList'
import CategoryList from '@/components/Category/CategoryList'
import ContentList from '@/components/Content/ContentList'
import ContentAdd from '@/components/Content/ContentAdd'
import DynamicList from '@/components/Dynamic/DynamicList'
import MessageList from '@/components/Message/MessageList'
import Index from '@/commons/Layout/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Index',
          component: Index
        },
        {
          path: '/user/userlist',
          name: 'UserList',
          component: UserList
        },
        {
          path: '/category/categorylist',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: '/content/contentlist',
          name: 'ContentList',
          component: ContentList
        },
        {
          path: '/content/contentadd',
          name: 'ContentAdd',
          component: ContentAdd
        },
        {
          path: '/dynamic/dynamiclist',
          name: 'DynamicList',
          component: DynamicList
        },
        {
          path: '/message/messagelist',
          name: 'MessageList',
          component: MessageList
        }
      ]
    }
  ]
})

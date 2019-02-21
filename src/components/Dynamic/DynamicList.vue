<template>
  <div>
    <el-breadcrumb style="float: left; height: 35px; line-height: 35px;">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>动态管理</el-breadcrumb-item>
      <el-breadcrumb-item>动态列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="dynamicList" :stripe="true" >
      <el-tabal-column align="center" prop="_id" label="id"></el-tabal-column>
      <el-tabal-column align="center" prop="content" label="内容"></el-tabal-column>
      <el-tabal-column align="center" prop="author" label="作者"></el-tabal-column>
      <el-tabal-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click.native="deleteDynamic(scope.row._id)">删除</el-button>
        </template>
      </el-tabal-column>
    </el-table>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Breadcrumb, BreadcrumbItem, MessageBox } from 'element-ui'
import Axios from 'axios'

export default {
  components: {
    'el-table': Table,
    'el-tabal-column': TableColumn,
    'el-button': Button,
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem
  },
  data () {
    return {
      dynamicList: []
    }
  },
  created () {
    Axios.get('http://localhost:3000/admin/dynamic/get').then(res => {
      this.dynamicList = res.data.dynamicList
    })
  },
  methods: {
    deleteDynamic (id) {
      MessageBox.confirm('是否要删除该动态', '确认删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let body = {
          id
        }
        Axios.post('http://localhost:3000/admin/dynamic/delete', { body }).then(res => {
          if (res.data.code === 0) {
            MessageBox.alert(res.data.message)
            // this.userList.map((item, index, list) => {
            //   if (item._id === id) {
            //     let position = list.indexOf(item)
            //     this.userList.splice(position, 1)
            //   }
            // })
            Axios.get('http://localhost:3000/admin/dynamic/get').then(res => {
              this.dynamicList = res.data.dynamicList
            })
          } else {
            MessageBox.alert(res.data.message)
          }
        })
      })
    }
  }
}
</script>

<template>
  <div>
    <el-breadcrumb style="float: left; height: 35px; line-height: 35px;">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>内容列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button style="float: right; height: 35px; line-height: 35px; padding: 0 10px;" type="primary">
      <router-link to="/content/contentadd" style="color: #fff">
        添加内容
      </router-link>
    </el-button>
    <el-table :data="contentList" :stripe="true" >
      <!-- <el-tabal-column align="center" prop="_id" label="id"></el-tabal-column> -->
      <el-tabal-column align="center" prop="title" label="文章标题"></el-tabal-column>
      <!-- <el-tabal-column align="center" prop="summary" label="文章简介"></el-tabal-column> -->
      <!-- <el-tabal-column align="center" prop="article" label="文章内容"></el-tabal-column> -->
      <el-tabal-column align="center" prop="author" label="文章作者"></el-tabal-column>
      <el-tabal-column align="center" label="分类"></el-tabal-column>
      <el-tabal-column align="center" label="标签"></el-tabal-column>
      <!-- <el-tabal-column align="center" label="所有人可见"></el-tabal-column> -->
      <el-tabal-column align="center" prop="date" label="创作时间"></el-tabal-column>
      <el-tabal-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click.native="deleteContent(scope.row._id)">删除</el-button>
          <el-button type="primary">修改</el-button>
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
      contentList: []
    }
  },
  created () {
    Axios.get('http://localhost:3000/admin/content/get').then(res => {
      this.contentList = res.data.contentList
    })
  },
  methods: {
    deleteContent (id) {
      MessageBox.confirm('是否要删除该用户', '确认删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let body = {
          id
        }
        Axios.post('http://localhost:3000/admin/content/delete', { body }).then(res => {
          if (res.data.code === 0) {
            Axios.get('http://localhost:3000/admin/content/get').then(res => {
              this.contentList = res.data.contentList
            })
            MessageBox.alert(res.data.message)
          } else {
            MessageBox.alert(res.data.message)
          }
        })
      })
    }
  }
}
</script>

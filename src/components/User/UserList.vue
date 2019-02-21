<template>
  <div>
    <el-breadcrumb style="float: left; height: 35px; line-height: 35px;">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" style="float: right; height: 35px; line-height: 35px; padding: 0 10px;" @click.native="dialogVisible = true">添加用户</el-button>
    <el-table :data="userList" :stripe="true" >
      <el-tabal-column align="center" prop="_id" label="id"></el-tabal-column>
      <el-tabal-column align="center" prop="username" label="用户名"></el-tabal-column>
      <el-tabal-column align="center" prop="password" label="密码"></el-tabal-column>
      <el-tabal-column align="center" prop="isAdmin" label="是否为管理员"></el-tabal-column>
      <el-tabal-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click.native="deleteUser(scope.row._id)">删除</el-button>
        </template>
      </el-tabal-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="400px">
      <el-form label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click.native="addUser">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Breadcrumb, BreadcrumbItem, MessageBox, Dialog, Input, Form, FormItem } from 'element-ui'
import Axios from 'axios'

export default {
  components: {
    'el-table': Table,
    'el-tabal-column': TableColumn,
    'el-button': Button,
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem,
    'el-dialog': Dialog,
    'el-input': Input,
    'el-form': Form,
    'el-form-item': FormItem
  },
  data () {
    return {
      userList: [],
      dialogVisible: false,
      username: '',
      password: ''
    }
  },
  created () {
    Axios.get('http://localhost:3000/admin/user/get').then(res => {
      this.userList = res.data.userList
    })
  },
  methods: {
    deleteUser (id) {
      MessageBox.confirm('是否要删除该用户', '确认删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let body = {
          id
        }
        Axios.post('http://localhost:3000/admin/user/delete', { body }).then(res => {
          if (res.data.code === 0) {
            MessageBox.alert(res.data.message)
            this.userList.map((item, index, list) => {
              if (item._id === id) {
                let position = list.indexOf(item)
                this.userList.splice(position, 1)
              }
            })
          } else {
            MessageBox.alert(res.data.message)
          }
        })
      })
    },
    addUser () {
      let body = {
        username: this.username,
        password: this.password
      }
      Axios.post('http://localhost:3000/admin/user/add', { body }).then(res => {
        if (res.data.code === 0) {
          Axios.get('http://localhost:3000/admin/user/get').then(res => {
            this.userList = res.data.userList
          })
          MessageBox.alert(res.data.message)
          this.dialogVisible = false
        } else {
          MessageBox.alert(res.data.message)
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style scoped>
.button {
  width: 100%;
}
</style>

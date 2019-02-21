<template>
  <div class="add">
    <el-breadcrumb style="float: left; height: 35px; line-height: 35px;">
      <el-breadcrumb-item>
        <router-link to="/">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加内容</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="100px">
      <el-form-item label="内容标题">
        <el-input v-model="title"/>
      </el-form-item>
      <el-form-item label="内容分类">
        <el-select v-model="selectedCategory">
          <el-option v-for="(category, index) in categoryList" :key="index" :value="category._id" :label="category.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容简介">
        <el-input v-model="summary" type="textarea"/>
      </el-form-item>
      <el-form-item label="内容正文">
        <el-input v-model="content" type="textarea" :rows="8"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox label="测试标签"/>
        <el-checkbox label="测试标签"/>
        <el-checkbox label="测试标签"/>
        <el-checkbox label="测试标签"/>
      </el-form-item>
      <el-form-item label="所有人可见">
        <el-switch/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="addContent">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Button, Breadcrumb, BreadcrumbItem, Form, FormItem, Input, Select, Switch, Checkbox, Option, MessageBox } from 'element-ui'
import Axios from 'axios'

export default {
  components: {
    'el-button': Button,
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-select': Select,
    'el-switch': Switch,
    'el-checkbox': Checkbox,
    'el-option': Option
  },
  data () {
    return {
      contentList: [],
      categoryList: [],
      summary: '',
      title: '',
      content: '',
      selectedCategory: ''
    }
  },
  created () {
    Axios.get('http://localhost:3000/admin/content/get').then(res => {
      this.contentList = res.data.contentList
    })
    Axios.get('http://localhost:3000/admin/category/get').then(res => {
      this.categoryList = res.data.categoryList
    })
  },
  methods: {
    addContent () {
      let body = {
        title: this.title,
        summary: this.summary,
        article: this.content
      }
      Axios.defaults.withCredentials = true
      Axios.post('http://localhost:3000/admin/content/add', { body }).then(res => {
        if (res.data.code === 0) {
          MessageBox.alert(res.data.message)
        } else {
          MessageBox.alert(res.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.add {
  display: flex;
  flex-direction: column;
}
</style>

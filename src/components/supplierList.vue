<template>
  <div class="main">

    <router-link to="/addSupplier" name="addSupplier" class="el-button el-button--primary">添加供应商</router-link>

    <div class="headSection">

      <div class="titleEach">
        <p class="leftP">供应商编码</p>
        <input type="text" v-model="queryData.supNO">
      </div>

      <div class="titleEach">
        <p class="leftP">添加时间</p>
        <el-date-picker
          v-model="valueDate"
          type="daterange"
          range-separator="~"
          placeholder="选择日期范围">
        </el-date-picker>
      </div>

      <div class="titleEach">
        <p class="leftP">供应商名称</p>
        <input type="text" v-model="queryData.supName">
      </div>

      <div class="titleEach">
        <p class="leftP">供应商分类</p>
        <el-select v-model="queryData.supType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="titleEach">
        <p class="leftP">创建人</p>
        <input type="text" v-model="queryData.crater">
      </div>

      <el-button type="primary" @click="queryList">查询</el-button>
      <el-button @click="resetCondition">重置</el-button>
    </div>

    <div class="midSection">
      
      <form action="//enterprise.qbao.com/supplier/export.html" name="" method="post" enctype="multipart/form-data" style="display: inline-block;">
        <input type="hidden" name="supNO" v-model="queryData.supNO" />
        <input type="hidden" name="supName" v-model="queryData.supName" />
        <input type="hidden" name="supType" v-model="queryData.supType" />
        <input type="hidden" name="crater" v-model="queryData.crater" />
        <input type="hidden" name="startTime" v-model="queryData.startTime" />
        <input type="hidden" name="endTime" v-model="queryData.endTime" />
        <input type="submit" name="download" id="download" value="导出excel" class="el-button">
      </form>
      <el-upload
        class="upload-demo"
        action="//enterprise.qbao.com/supplier/upload.html"
        >
      <el-button>导入excel</el-button>
      </el-upload>
    </div>

    <div class="mainSection">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="70">
        </el-table-column>
        <el-table-column
          prop="supName"
          label="供应商名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="supNO"
          label="编码">
        </el-table-column>
        <el-table-column
          label="分类">
          <template scope="scope">
            <span>{{scope.row.supType == 1?'供销':scope.row.supType == 2?'推广':''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contacts"
          label="联系人">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="provincialAreas"
          label="地址">
        </el-table-column>
        <el-table-column
          label="开户行">
          <template scope="scope">
            <span>{{scope.row.bankName == null?'':scope.row.bankName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账号">
          <template scope="scope">
            <span>{{scope.row.accountNumber == null?'':scope.row.accountNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right">
          <template scope="scope">
          <router-link :to="{ path:'/addSupplier', query: { id:scope.row.id } }" class="ope">修改</router-link>
          </template>
        </el-table-column>
        
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="queryData.currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="queryData.totalPage">
      </el-pagination>
    </div>

  </div>
</template>

<script>

import * as tool from '../tool/tool.js'

export default {
    data() {
      return {
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '供销'
        }, {
          value: '2',
          label: '推广'
        }],
        value: '',
        valueDate:'',
        tableData: [],
        queryData:{
          totalPage:0,
          currentPage:1,
          startTime:'',
          endTime:'',
          supNO:'',
          supName:'',
          supType:'',
          crater:''
        }
      }
    },
    methods: {
      loadList(){
        this.$http.post("//enterprise.qbao.com/supplier/list.html",{
          "startTime": this.queryData.startTime,
          "endTime": this.queryData.endTime,
          "supNO": this.queryData.supNO,
          "supName": this.queryData.supName,
          "supType": this.queryData.supType,
          "crater": this.queryData.crater,
          "pageSize":10,
          "curPage": this.queryData.currentPage
        }).then(response => {
          this.tableData = response.body.data.data;
          this.queryData.totalPage = response.body.data.totalCount;
        }, response => {});
      },
      queryList(){
        if ( this.valueDate != '' && this.valueDate[0] != null ) {
          this.queryData.startTime = tool.formatDateTime(this.valueDate[0]);
          this.queryData.endTime = tool.formatDateTime(this.valueDate[1]).substring(0,11)+'23:59:59';
        }
        this.loadList()
      },
      handleCurrentChange(val) {
        this.queryData.currentPage = val;
        this.loadList();
      },
      resetCondition(){
        this.queryData.supNO = this.valueDate = this.queryData.supName = this.queryData.supType = this.queryData.crater = '';
      }
    },
    created(){
      this.loadList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{ padding:20px; width: 960px; }
.headSection{ margin-top: 20px; }
.headSection>div{ display: inline-block; margin:0 15px 15px 0; }
.leftP{ display: inline-block; width: 84px; color: #666; text-align: ri }
.titleEach input{ width: 200px; border: 1px solid #dddddd; height: 30px; padding-left: 5px; outline: none; }

.upload-demo{ display: inline-block; }
.midSection,.mainSection{ margin-top: 15px; }

.ope{ color: #fc8530; }

.pagination{ margin:20px 0; text-align: right; }
</style>

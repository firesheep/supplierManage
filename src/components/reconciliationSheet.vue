<template>
	
<div class="main">
	<div class="headSection">

		<div class="titleEach">
			<p class="leftP">订单编号</p>
			<input type="text" v-model="queryData.orderId">
		</div>

		<div class="titleEach">
			<p class="leftP">商品名称</p>
			<input type="text" v-model="queryData.spuTxt">
		</div>

		<div class="titleEach">
			<p class="leftP">供应商名称</p>
			<input type="text" v-model="queryData.supNameOrNO" placeholder="请输入供应商名称关键词">
		</div>
		
		<div class="titleEach">
			<p class="leftP">商品ID</p>
			<input type="text" v-model="queryData.sku" style="width:120px;">
		</div>

		<div class="titleEach">
			<p class="leftP">供应商分类</p>
			<el-select v-model="queryData.orderState" placeholder="请选择">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
		</div>

		<div class="titleEach">
			<p class="leftP" style="width:86px;">确认收货时间</p>
				<el-date-picker
				v-model="valueDate"
				type="daterange"
				range-separator="~"
				placeholder="选择日期范围">
			</el-date-picker>
		</div>

		<el-button type="primary" @click="queryList">查询</el-button>
		<el-button @click="resetCondition">重置</el-button>
    </div>

    <div class="midSection">
      <form action="//enterprise.qbao.com/supplier/order/check/export.html" name="" method="post" enctype="multipart/form-data" style="display: inline-block;">
        <input type="hidden" name="orderId" v-model="queryData.orderId" />
        <input type="hidden" name="spuTxt" v-model="queryData.spuTxt" />
        <input type="hidden" name="supNameOrNO" v-model="queryData.supNameOrNO" />
        <input type="hidden" name="sku" v-model="queryData.sku" />
        <input type="hidden" name="orderState" v-model="queryData.orderState" />
        <input type="hidden" name="confromStartTime" v-model="queryData.confromStartTime" />
        <input type="hidden" name="confromEndTime" v-model="queryData.confromEndTime" />
        <input type="submit" name="download" id="download" value="导出excel" class="el-button">
      </form>
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
          prop="orderId"
          label="订单编号">
        </el-table-column>

        <el-table-column
          prop="spuTxt"
          label="商品名称">
        </el-table-column>

        <el-table-column
          prop="sku"
          label="商品ID">
        </el-table-column>

        <el-table-column
          prop="skuTxt"
          label="规格">
        </el-table-column>

        <el-table-column
          prop="unitPrice"
          label="单价">
          <template scope="scope">
            <span>{{(scope.row.unitPrice/100).toFixed(2)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="goodsNum"
          label="数量(件)">
        </el-table-column>

        <el-table-column
          prop="goodsAmount"
          label="商品总价">
          <template scope="scope">
            <span>{{(scope.row.goodsAmount/100).toFixed(2)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="supPrice"
          label="商品采购总价">
          <template scope="scope">
            <span>{{(scope.row.supPrice/100).toFixed(2)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="profit"
          label="订单利润">
          <template scope="scope">
            <span>{{(scope.row.profit/100).toFixed(2)}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="orderConfirmTimeStr"
          label="确认收货时间">
        </el-table-column>

        <el-table-column
          prop="orderState"
          label="订单状态">
          <template scope="scope">
            <span>{{scope.row.orderState == 1000?'交易成功':"申请售后"}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="退款金额"
          fixed="right">
          <template scope="scope">
          	<input type="text" style="width:50px;" v-model="scope.row.refundAmount">
          	<el-button type="primary" size="mini" @click="updateRefundFn(scope.row.id, (scope.row.refundAmount*100).toFixed(0))">OK</el-button>
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
import { Message } from 'element-ui'
import * as tool from '../tool/tool.js'

export default {
	data(){
		return {
			options: [{
	          value: '',
	          label: '全部'
	        }, {
	          value: '1',
	          label: '交易成功'
	        }, {
	          value: '2',
	          label: '申请售后'
	        }],
	        valueDate:'',
	        tableData: [],
	        refundAmount:'',
			queryData:{
				totalPage:0,
				currentPage:1,
				orderId:'',
				spuTxt:'',
				supNameOrNO:'',
				sku:'',
				orderState:'',
				confromStartTime: '',
            	confromEndTime: ''
			}
		}
	},
	methods:{
		loadList(){
			this.$http.post("//enterprise.qbao.com/supplier/order/check/list.html",{
				"orderId": this.queryData.orderId,
	            "spuTxt": this.queryData.spuTxt,
	            "supNameOrNO": this.queryData.supNameOrNO,
	            "sku": this.queryData.sku,
	            "orderState": this.queryData.orderState,
	            "confromStartTime": this.queryData.confromStartTime,
	            "confromEndTime": this.queryData.confromEndTime,
	            "pageSize":10,
	            "curPage": this.queryData.currentPage
			}).then(response => {
				this.tableData = response.body.data.data;
				this.tableData.forEach( function(item, i) {
					Object.assign(item, {"refundAmount":''})
				});
				this.queryData.totalPage = response.body.data.totalCount;
			}, response => {});
		},
		queryList(){
			if ( this.valueDate != '' && this.valueDate[0] != null ) {
	          this.queryData.confromStartTime = tool.formatDateTime(this.valueDate[0]);
	          this.queryData.confromEndTime = tool.formatDateTime(this.valueDate[1]).substring(0,11)+'23:59:59';
	        }
	        this.loadList()
		},
		resetCondition(){
			this.queryData.orderId = this.queryData.spuTxt = this.queryData.supNameOrNO = this.queryData.sku = this.queryData.orderState = this.valueDate = '';
		},
		handleCurrentChange(val) {
	        this.queryData.currentPage = val;
	        this.loadList();
		},
		updateRefundFn(id, refundAmount){
			this.$http.post("//enterprise.qbao.com/supplier/order/check/updateRefund.html",{
				'id':id,
            	'refundAmount':refundAmount
			}).then(response => {
				console.log( response )
				if ( response.body.success ) {
					Message({
						message: '修改成功!',
						type: 'success'
			        });
			        this.loadList()
				}else{
					Message.error(response.body.message);
				}
			}, response => {});
		}
	},
	created(){
		this.loadList()
	}
}

</script>

<style scoped>
.main{ padding:20px; width: 960px; }
.headSection{ margin-top: 20px; }
.headSection>div{ display: inline-block; margin:0 15px 15px 0; }
.leftP{ display: inline-block; width: 70px; color: #666; text-align: ri }
.titleEach input{ width: 200px; border: 1px solid #dddddd; height: 30px; padding-left: 5px; outline: none; }
.midSection,.mainSection{ margin-top: 15px; }

.pagination{ margin:20px 0; text-align: right; }
</style>



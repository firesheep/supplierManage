<template>
	<div class="main">
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<p class="subtitle">填写基本信息</p>
		<div class="contentMain">
			<div class="term">
				<p class="tit">供应商编码</p>
				<p class="content">s2342545989</p>
			</div>
			
			<el-form-item label="供应商分类" prop="supType">
			    <el-select v-model="ruleForm.supType" placeholder="请选择">
			      <el-option label="供销" value="1"></el-option>
			      <el-option label="推广" value="2"></el-option>
			    </el-select>
			</el-form-item>

			<el-form-item label="供应商名称" prop="supName">
			    <el-input v-model="ruleForm.supName"></el-input>
			</el-form-item>
		</div>

		<p class="subtitle">填写联系人</p>
		<div class="contentMain">
			<el-form-item label="联系人姓名">
			    <el-input v-model="contacts"></el-input>
	  		</el-form-item>

	  		<el-form-item label="手机号" prop="mobilePhone">
			    <el-input v-model.number="mobilePhone" :maxlength="11"></el-input>
			    <p class="tip">仅限数字，11个字符</p>
	  		</el-form-item>

	  		<el-form-item label="QQ" prop="qq">
			    <el-input v-model.number="qq"></el-input>
			    <p class="tip">仅限数字</p>
	  		</el-form-item>

	  		<el-form-item label="固定电话" prop="telPhone">
			    <el-input v-model.number="telPhone"></el-input>
			    <p class="tip">仅限数字</p>
	  		</el-form-item>

	  		<el-form-item label="邮箱">
			    <el-input v-model="email"></el-input>
	  		</el-form-item>

	  		<el-form-item label="联系人备注">
			    <el-input v-model="contactsRemark"></el-input>
	  		</el-form-item>
		</div>

		<p class="subtitle">填写公司信息</p>
		<div class="contentMain">
			<el-form-item label="公司名称">
			    <el-input v-model="companyName"></el-input>
	  		</el-form-item>
			
			<el-form-item label="公司地址">
				<el-select v-model="provinceLabel" placeholder="省" @change="getCity">
				    <el-option
				      v-for="item in province"
				      :key="item.provinceValue"
				      :label="item.provinceLabel"
				      :value="item.provinceValue"
				      >
				    </el-option>
			  	</el-select>
			  	<el-select v-model="cityLabel" placeholder="市" @change="getCounty">
				    <el-option
				      v-for="item in city"
				      :key="item.cityValue"
				      :label="item.cityLabel"
				      :value="item.cityValue"
				      >
				    </el-option>
			  	</el-select>
			  	<el-select v-model="countyLabel" placeholder="县（区）" @change="countyFn">
				    <el-option
				      v-for="item in county"
				      :key="item.countyValue"
				      :label="item.countyLabel"
				      :value="item.countyValue">
				    </el-option>
			  	</el-select>
				<el-input v-model="street" placeholder="街道、门牌号"></el-input>
			</el-form-item>

			<el-form-item label="公司电话" prop="companyTelPhone">
			    <el-input v-model="companyTelPhone"></el-input>
			    <p class="tip">仅限数字</p>
	  		</el-form-item>

	  		<el-form-item label="开户行" prop="bankName">
			    <el-input v-model="bankName"></el-input>
			    <p class="tip">仅限中文</p>
	  		</el-form-item>

	  		<el-form-item label="银行账号" prop="accountNumber">
			    <el-input v-model="accountNumber"></el-input>
			    <p class="tip">仅限数字</p>
	  		</el-form-item>

	  		<el-form-item label="证件扫描件">
			    <el-upload
					class="upload-demo"
					action="//enterprise.qbao.com/photo/upload.html"
					:before-upload="beforePaperUpload"
					:on-success="handlePaperSuccess"
					:on-remove="handlePaperRemove"
					:file-list="fileListOne"
					list-type="picture-card">
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">支持jpg、jpeg、gif、png、bmp格式，图片大小不超过1M</div>
				</el-upload>
	  		</el-form-item>

	  		<el-form-item label="合同扫描件">
			    <el-upload
					class="upload-demo"
					action="//enterprise.qbao.com/photo/upload.html"
					:before-upload="beforePactUpload"
					:on-success="handlePactSuccess"
					:on-remove="handlePactRemove"
					:file-list="fileListTwo"
					list-type="picture-card">
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">支持jpg、jpeg、gif、png、bmp格式，图片大小不超过1M</div>
				</el-upload>
	  		</el-form-item>
		</div>

		<p class="subtitle">添加备注</p>
		<div class="contentMain">
		    <el-input type="textarea" v-model="remark"></el-input>

		    <el-button type="primary"  @click="submitForm('ruleForm')" size="large" style="margin-top:20px; padding:11px 39px;">保存</el-button>
		</div>

	</el-form>
	</div>
</template>

<script>
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'
import * as tool from '../tool/tool.js'

export default {
	data() {
      return {
      	contacts: '',
		mobilePhone: '',
		telPhone: '',
		qq: '',
		email: '',
		contactsRemark: '',
		companyName: '',
		companyTelPhone: '',
		street: '',
		bankName: '',
		accountNumber: '',
		paperScanningImgPath: '',
		pactScanningImgPath: '',
		remark: '',
        ruleForm: {
			supName: '',
			supType: ''
        },
        rules: {
			supName: [
				{ required: true, message: '请输入供应商名称', trigger: 'blur' }
			],
			supType: [
				{ required: true, message: '请选择供应商分类', trigger: 'change' }
			],
			mobilePhone:[
				{ type: 'number', message: '手机号必须为数字值'}
			],
			qq:[
				{ type: 'number', message: 'QQ号必须为数字值'}
			],
			telPhone:[
				{ type: 'number', message: '固定电话必须为数字值'}
			],
			companyTelPhone:[
				{ type: 'number', message: '公司电话必须为数字值'}
			],
			bankName:[
				{ pattern: /[\u4E00-\u9FA5\uF900-\uFA2D]/, message: '开户行必须为中文' }
			],
			accountNumber:[
				{ type: 'number', message: '银行账号必须为数字值'}
			]
        },
        province: [],
		city:[],
		county:[],
        provinceValue:'',
        provinceLabel:'',
        cityValue:'',
        cityLabel:'',
        countyValue:'',
        countyLabel:'',
        fileListOne:[],
        fileListTwo:[]
      };
    },
    methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var url = '';
					var params = {
						"supName": this.ruleForm.supName,
			            "supType": (isNaN(Number(this.ruleForm.supType))?( this.ruleForm.supType == '供销'?1:2 ):this.ruleForm.supType) ,
			            "contacts": this.contacts,
			            "mobilePhone": this.mobilePhone,
			            "telPhone": this.telPhone,
			            "qq": this.qq,
			            "email": this.email,
			            "contactsRemark": this.contactsRemark,
			            "companyName": this.companyName,
			            'province': this.provinceValue,
			            'city': this.cityValue, 
			            'area': this.countyValue,
			            "companyTelPhone": this.companyTelPhone,
			            "street": this.street,
			            "bankName": this.bankName,
			            "accountNumber": this.accountNumber,
			            "paperScanningImgPath": this.getImgData(this.fileListOne),
			            "pactScanningImgPath": this.getImgData(this.fileListTwo),
			            "remark": this.remark
			        };
					if ( this.$route.query.id != undefined ) {
						url = '//enterprise.qbao.com/supplier/update.html'
						Object.assign(params, { "id":this.$route.query.id })
					}else{
						url = '//enterprise.qbao.com/supplier/add.html'
					}
					this.$http({
						url: url,
						method : 'post',
						params: params
					}).then(response => {
							Message({
								message: '提交成功!',
								type: 'success'
					        });
							this.openMessageBox();
				        }, response => {});
					} else {
						Message.error('请填写必填项!');
						return false;
					}
				});
		},
		openMessageBox() {
	        const h = this.$createElement;
	        MessageBox({
	          title: '消息',
	          message: h('p', null, [
	            h('span', null, '内容可以是 '),
	            h('i', { style: 'color: teal' }, 'VNode')
	          ]),
	          showCancelButton: true,
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          beforeClose: (action, instance, done) => {
	            if (action === 'confirm') {
	              instance.confirmButtonLoading = true;
	              instance.confirmButtonText = '执行中...';
	              setTimeout(() => {
	                done();
	                setTimeout(() => {
	                  instance.confirmButtonLoading = false;
	                }, 300);
	              }, 3000);
	            } else {
	              done();
	            }
	          }
	        }).then(action => {
	          this.$message({
	            type: 'info',
	            message: 'action: ' + action
	          });
	        });
	      },
		modifyFn: function () {
			this.$http({
				url:"//enterprise.qbao.com/supplier/get.html",
				method :'post',
				params:{
					'id': this.$route.query.id
		        }
		    }).then(response => {
		    	const data = response.body.data;
		    	this.ruleForm.supName = data.supName;
	            this.ruleForm.supType = (data.supType == 1?"供销":data.supType == 2?"推广":"");
	            this.contacts = data.contacts;
	            this.mobilePhone = data.mobilePhone;
	            this.telPhone = data.telPhone;
	            this.qq = data.qq;
	            this.email = data.email;
	            this.contactsRemark = data.contactsRemark;
	            this.companyName = data.companyName;
	            this.provinceLabel =  data.province;
	            this.cityLabel = data.city;
	            this.countyLabel = data.area;
	            this.companyTelPhone = data.companyTelPhone;
	            this.street = data.street;
	            this.bankName = data.bankName;
	            this.accountNumber = data.accountNumber;

	            const This = this;
	            if ( data.paperScanningImgPath != '' ) {
					data.paperScanningImgPath.split(',').forEach( function(item, i) {
		            	This.fileListOne.push({
		            		'name':Math.random(),
		            		'url':item
		            	})
		            });
	            }
	            if ( data.pactScanningImgPath != '' ) {
	            	data.pactScanningImgPath.split(',').forEach( function(item, i) {
		            	This.fileListTwo.push({
		            		'name':Math.random(),
		            		'url':item
		            	})
		            });
	            }
	            
	            this.remark = data.remark;
	            var getProvinceId = '';
				this.province.forEach( function(item, i) {
					if ( item.provinceLabel == data.province ) {
						getProvinceId = item.provinceValue
					}
				});
				this.getCity(getProvinceId, true);
			}, response => {});
		},
		getProvince(){
			this.$http.get("//enterprise.qbao.com/region/provinces.html").then(response => {
				const This = this;
				response.body.data.forEach( function(item, i) {
					This.province.push({
						provinceValue:item.id,
						provinceLabel:item.name
					})
				});
	        }, response => {});
		},
		getCity(val, modify) {
			if ( isNaN(Number(val)) ) return;
			this.city.splice(0,this.city.length);

			const This = this;
			this.province.forEach( function(item, i) {
				if ( val == item.provinceValue ) {
					This.provinceValue = item.provinceLabel;
				}
			});
			
			this.$http.post("//enterprise.qbao.com/region/cities.html",{"provinceId": val }).then(response => {
				const This = this;
				response.body.data.forEach( function(item, i) {
					This.city.push({
						cityValue:item.id,
						cityLabel:item.name
					})
					if ( This.cityLabel == item.id ) {
						This.cityValue = item.name;
					}
				});
				var getCityId = '';
				This.city.forEach( function(item, i) {
					if ( item.cityLabel == This.cityLabel ) {
						getCityId = item.cityValue
					}
				});
				This.getCounty(getCityId, modify);
				if ( !modify ) {
					this.cityLabel = '';
				}
	        }, response => {});
		},
		getCounty(val, modify) {
			if ( isNaN(Number(val)) || val == '' ) return false;
			this.county.splice(0,this.county.length);

			const This = this;
			this.city.forEach( function(item, i) {
				if ( val == item.cityValue ) {
					This.cityValue = item.cityLabel;
				}
			});

			this.$http.post("//enterprise.qbao.com/region/areas.html",{"cityId":val}).then(response => {
				const This = this;
				response.body.data.forEach( function(item, i) {
					This.county.push({
						countyValue:item.id,
						countyLabel:item.name
					})
					if ( This.countyLabel == item.id ) {
						This.countyValue = item.name;
					}
				});
				if ( !modify ) {
					this.countyLabel = '';
				}
	        }, response => {});
		},
		countyFn(val){
			const This = this;
			this.county.forEach( function(item, i) {
				if ( val == item.countyValue ) {
					This.countyValue = item.countyLabel;
				}
			});
		},
		beforePaperUpload(file){
			const isLt1M = file.size / 1024 / 1024 < 1;
			if ( this.fileListOne.length > 9 ) {
				Message.error('证件扫描件最多上传10张!');
				return false;
			}
			if ( !isLt1M ) {
	          Message.error('图片大小不超过1M!');
	        }
	        return isLt1M;
		},
		handlePaperSuccess(file){
			this.fileListOne.push({
				"name":Math.random(),
				"url":file.message
			});
		},
		handlePaperRemove(file){
			if ( file == null ) return;
			tool.removeByValue(this.fileListOne, file)
		},
		beforePactUpload(file){
			const isLt1M = file.size / 1024 / 1024 < 1;
			if ( this.fileListOne.length > 14 ) {
				Message.error('证件扫描件最多上传15张!');
				return false;
			}
			if ( !isLt1M ) {
	          Message.error('图片大小不超过1M!');
	        }
	        return isLt1M;
		},
		handlePactSuccess(file){
			this.fileListTwo.push({
				"name":Math.random(),
				"url":file.message
			});
		},
		handlePactRemove(file){
			if ( file == null ) return;
			tool.removeByValue(this.fileListTwo, file)
		},
		getImgData(arr){
			var result = '';
			arr.forEach( function(item, i) {
				result += item.url+','
			});
			return result = result.substring(0,result.length-1);
		}
    },
    created(){
		this.getProvince();
		if ( this.$route.query.id != undefined ) {
			this.modifyFn();
		}
    }
}




</script>

<style scoped>
.main{ padding:20px; width: 960px; min-height: 1000px; }
.subtitle{ background: #f7f9fb; border-top: 1px solid #e7e7eb; padding:10px 20px; color: #333333; font-size: 16px; }
.contentMain{ padding:35px 0 60px 100px; }
.term{ margin-bottom: 22px; }
.term>*{ display: inline-block; vertical-align: middle; color: #6a5248; }
.tit{ margin-right: 10px; text-align: right; width: 88px; }

.tip{ color: #888888; font-size: 12px; display: inline-block; }
</style>


<template>
	<div class="add-update-preview">
		<el-form
			class="add-update-form"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="180px"
			>
			<el-form-item class="add-item" label="用户账号" prop="yonghuzhanghao">
				<el-select  @change="yonghuzhanghaoChange" v-model="ruleForm.yonghuzhanghao" placeholder="请选择用户账号">
					<el-option
						v-for="(item,index) in yonghuzhanghaoOptions"
						:key="index"
						:label="item"
						:value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="add-item" label="用户姓名" prop="yonghuxingming">
				<el-input v-model="ruleForm.yonghuxingming" 
					placeholder="用户姓名" clearable :disabled=" false  ||ro.yonghuxingming"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="社保类型" prop="shebaoleixing">
				<el-input v-model="ruleForm.shebaoleixing" 
					placeholder="社保类型" clearable :disabled=" false  ||ro.shebaoleixing"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="社保图片" v-if="type!='cross' || (type=='cross' && !ro.shebaotupian)" prop="shebaotupian">
				<file-upload
					tip="点击上传社保图片"
					action="file/upload"
					:limit="3"
					:multiple="true"
					:fileUrls="ruleForm.shebaotupian?ruleForm.shebaotupian:''"
					@change="shebaotupianUploadChange"
					></file-upload>
			</el-form-item>
			<el-form-item class="add-item" v-else label="社保图片" prop="shebaotupian">
				<img v-if="ruleForm.shebaotupian.substring(0,4)=='http'" class="upload-img" v-bind:key="index" :src="ruleForm.shebaotupian.split(',')[0]">
				<img v-else class="upload-img" v-bind:key="index" v-for="(item,index) in ruleForm.shebaotupian.split(',')" :src="baseUrl+item">
			</el-form-item>
			<el-form-item class="add-item" label="社保价格" prop="shebaojiage">
				<el-input-number v-model="ruleForm.shebaojiage" placeholder="社保价格" :disabled=" false ||ro.shebaojiage"></el-input-number>
			</el-form-item>
			<el-form-item class="add-item" label="缴费日期" prop="jiaofeiriqi">
				<el-date-picker
					:disabled=" false  ||ro.jiaofeiriqi"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
					v-model="ruleForm.jiaofeiriqi" 
					type="date"
					placeholder="缴费日期">
				</el-date-picker> 
			</el-form-item>
			<el-form-item class="add-item" label="企业账号" prop="qiyezhanghao">
				<el-input v-model="ruleForm.qiyezhanghao" 
					placeholder="企业账号" clearable :disabled=" false  ||ro.qiyezhanghao"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="负责人姓名" prop="fuzerenxingming">
				<el-input v-model="ruleForm.fuzerenxingming" 
					placeholder="负责人姓名" clearable :disabled=" false  ||ro.fuzerenxingming"></el-input>
			</el-form-item>
			<el-form-item class="add-item" label="缴费详情" prop="jiaofeixiangqing">
				<editor 
					v-model="ruleForm.jiaofeixiangqing" 
					class="editor" 
					action="file/upload">
				</editor>
			</el-form-item>

			<el-form-item class="add-btn-item">
				<el-button class="submitBtn"  type="primary" @click="onSubmit">
					<span class="icon iconfont icon-kaitongfuwu"></span>
					<span class="text">确定</span>
				</el-button>
				<el-button class="closeBtn" @click="back()">
					<span class="icon iconfont icon-shanchu1"></span>
					<span class="text">取消</span>
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				baseUrl: '',
				ro:{
					yonghuzhanghao : false,
					yonghuxingming : false,
					shebaoleixing : false,
					shebaotupian : false,
					shebaojiage : false,
					jiaofeiriqi : false,
					jiaofeixiangqing : false,
					qiyezhanghao : false,
					fuzerenxingming : false,
					ispay : false,
				},
				type: '',
				userTableName: localStorage.getItem('UserTableName'),
				ruleForm: {
					yonghuzhanghao: '',
					yonghuxingming: '',
					shebaoleixing: '',
					shebaotupian: '',
					shebaojiage: '',
					jiaofeiriqi: '',
					jiaofeixiangqing: '',
					qiyezhanghao: '',
					fuzerenxingming: '',
				},
				yonghuzhanghaoOptions: [],


				rules: {
					yonghuzhanghao: [
					],
					yonghuxingming: [
					],
					shebaoleixing: [
					],
					shebaotupian: [
					],
					shebaojiage: [
						{ validator: this.$validate.isNumber, trigger: 'blur' },
					],
					jiaofeiriqi: [
					],
					jiaofeixiangqing: [
					],
					qiyezhanghao: [
					],
					fuzerenxingming: [
					],
					ispay: [
					],
				},
				centerType: false,
			};
		},
		computed: {



		},
		components: {
		},
		created() {
			if(this.$route.query.centerType){
				this.centerType = true
			}
			//this.bg();
			let type = this.$route.query.type ? this.$route.query.type : '';
			this.init(type);
			this.baseUrl = this.$config.baseUrl;
			this.ruleForm.jiaofeiriqi = this.getCurDate()
		},
		methods: {
			getMakeZero(s) {
				return s < 10 ? '0' + s : s;
			},
			// 下载
			download(file){
				window.open(`${file}`)
			},
			// 初始化
			init(type) {
				this.type = type;
				if(type=='cross'){
					var obj = JSON.parse(localStorage.getItem('crossObj'));
					for (var o in obj){
						if(o=='yonghuzhanghao'){
							this.ruleForm.yonghuzhanghao = obj[o];
							this.ro.yonghuzhanghao = true;
							continue;
						}
						if(o=='yonghuxingming'){
							this.ruleForm.yonghuxingming = obj[o];
							this.ro.yonghuxingming = true;
							continue;
						}
						if(o=='shebaoleixing'){
							this.ruleForm.shebaoleixing = obj[o];
							this.ro.shebaoleixing = true;
							continue;
						}
						if(o=='shebaotupian'){
							this.ruleForm.shebaotupian = obj[o].split(",")[0];
							this.ro.shebaotupian = true;
							continue;
						}
						if(o=='shebaojiage'){
							this.ruleForm.shebaojiage = obj[o];
							this.ro.shebaojiage = true;
							continue;
						}
						if(o=='jiaofeiriqi'){
							this.ruleForm.jiaofeiriqi = obj[o];
							this.ro.jiaofeiriqi = true;
							continue;
						}
						if(o=='jiaofeixiangqing'){
							this.ruleForm.jiaofeixiangqing = obj[o];
							this.ro.jiaofeixiangqing = true;
							continue;
						}
						if(o=='qiyezhanghao'){
							this.ruleForm.qiyezhanghao = obj[o];
							this.ro.qiyezhanghao = true;
							continue;
						}
						if(o=='fuzerenxingming'){
							this.ruleForm.fuzerenxingming = obj[o];
							this.ro.fuzerenxingming = true;
							continue;
						}
					}
				}else if(type=='edit'){
					this.info()
				}
				// 获取用户信息
				this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
					if (res.data.code == 0) {
						var json = res.data.data;
						if((json.qiyezhanghao!=''&&json.qiyezhanghao) || json.qiyezhanghao==0){
							this.ruleForm.qiyezhanghao = json.qiyezhanghao;
							this.ro.qiyezhanghao = true;
						}
						if((json.fuzerenxingming!=''&&json.fuzerenxingming) || json.fuzerenxingming==0){
							this.ruleForm.fuzerenxingming = json.fuzerenxingming;
							this.ro.fuzerenxingming = true;
						}
					}
				});
				this.$http.get('option/yonghu/yonghuzhanghao', {emulateJSON: true}).then(res => {
					if (res.data.code == 0) {
						this.yonghuzhanghaoOptions = res.data.data;
					}
				});

				if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
					localStorage.removeItem('raffleType')
					setTimeout(() => {
						this.onSubmit()
					}, 300)
				}
			},
			// 下二随
			yonghuzhanghaoChange () {
				this.$http.get('follow/yonghu/yonghuzhanghao?columnValue=' + this.ruleForm.yonghuzhanghao, {emulateJSON: true}).then(res => {
					if (res.data.code == 0) {
						if(res.data.data.yonghuxingming){
							this.ruleForm.yonghuxingming = res.data.data.yonghuxingming
						}
					}
				});
			},

			// 多级联动参数
			// 多级联动参数
			info() {
				this.$http.get(`shebaojiaofei/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
					if (res.data.code == 0) {
						this.ruleForm = res.data.data;
					}
				});
			},
			// 提交
			async onSubmit() {
				await this.$refs["ruleForm"].validate(async valid => {
					if(valid) {
						if(this.type=='cross'){
							var statusColumnName = localStorage.getItem('statusColumnName');
							var statusColumnValue = localStorage.getItem('statusColumnValue');
							if(statusColumnName && statusColumnName!='') {
								var obj = JSON.parse(localStorage.getItem('crossObj'));
								if(!statusColumnName.startsWith("[")) {
									for (var o in obj){
										if(o==statusColumnName){
											obj[o] = statusColumnValue;
										}
									}
									var table = localStorage.getItem('crossTable');
									await this.$http.post(table+'/update', obj).then(res => {});
								}
							}
						}


						await this.$http.post(`shebaojiaofei/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(async res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										if(this.isBackAuth('shebaojiaofei','支付')&&this.type=='cross'){
											this.$confirm('是否跳转支付？') .then(_ => {
												let jumpParams = {
													id: res.data.data,
													centerType: 1
												}
												this.$router.push({path: '/index/shebaojiaofeiDetail', query: jumpParams});
											}).catch(_ => {
												this.$router.go(-1);
											});
										}else {
											this.$router.go(-1);
										}
										
										
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
							}
						});
					}
				});
			},
			// 获取uuid
			getUUID () {
				return new Date().getTime();
			},
			// 返回
			back() {
				this.$router.go(-1);
			},
			shebaotupianUploadChange(fileUrls) {
				this.ruleForm.shebaotupian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
			},
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.add-update-preview {
		padding: 0 0 20px;
		margin: 0px auto;
		color: #666;
		background: #fff;
		width: 1200px;
		font-size: 16px;
		position: relative;
		.add-update-form {
			margin: 20px 0 0;
			width: 100%;
			position: relative;
			.add-item.el-form-item {
				padding: 0 0 10px;
				margin: 0 0 10px;
				background: none;
				border-color: #ccc;
				border-width: 0 0 1px;
				border-style: dashed;
				/deep/ .el-form-item__label {
					padding: 0 10px 0 0;
					color: #000000;
					font-weight: 500;
					width: 180px;
					font-size: inherit;
					line-height: 40px;
					text-align: center;
				}
				/deep/ .el-form-item__content {
					margin-left: 180px;
				}
				.el-input {
					width: auto;
				}
				.el-input /deep/ .el-input__inner {
					border: 1px solid #ddd;
					border-radius: 0px;
					padding: 0 12px;
					box-shadow: none;
					color: inherit;
					width: auto;
					font-size: 16px;
					height: 40px;
				}
				.el-input /deep/ .el-input__inner[readonly="readonly"] {
					border: 0;
					cursor: not-allowed;
					border-radius: 0px;
					padding: 0 12px;
					box-shadow: none;
					color: rgba(85, 85, 127, 1.0);
					background: none;
					width: auto;
					font-size: 16px;
					height: 40px;
				}
				.el-input-number /deep/ .el-input__inner {
					text-align: left;
					border: 1px solid #ddd;
					border-radius: 0px;
					padding: 0 12px;
					box-shadow: none;
					color: inherit;
					width: auto;
					font-size: 16px;
					height: 40px;
				}
				.el-input-number /deep/ .is-disabled .el-input__inner {
					text-align: left;
					border: 0;
					cursor: not-allowed;
					border-radius: 0px;
					padding: 0 12px;
					box-shadow: none;
					color: rgba(85, 85, 127, 1.0);
					background: none;
					width: auto;
					font-size: 16px;
					height: 40px;
				}
				.el-input-number /deep/ .el-input-number__decrease {
					display: none;
				}
				.el-input-number /deep/ .el-input-number__increase {
					display: none;
				}
				.el-select {
					width: auto;
				}
				.el-select /deep/ .el-input__inner {
					border: 1px solid #ddd;
					border-radius: 0px;
					padding: 0 10px;
					color: inherit;
					width: 100%;
					font-size: 16px;
					min-width: inherit !important;
					height: 40px;
				}
				.el-select /deep/ .is-disabled .el-input__inner {
					border: 0;
					cursor: not-allowed;
					border-radius: 0px;
					padding: 0 10px;
					box-shadow: none;
					color: inherit;
					background: none;
					width: 100%;
					font-size: 16px;
					height: 40px;
				}
				.el-date-editor {
					width: auto;
				}
				.el-date-editor /deep/ .el-input__inner {
					border: 1px solid #ddd;
					border-radius: 0px;
					padding: 0 10px 0 30px;
					box-shadow: none;
					color: inherit;
					width: auto;
					font-size: 16px;
					height: 40px;
				}
				.el-date-editor /deep/ .el-input__inner[readonly="readonly"] {
					border: 0;
					cursor: not-allowed;
					border-radius: 0px;
					padding: 0 10px 0 30px;
					box-shadow: none;
					color: inherit;
					background: none;
					width: auto;
					font-size: 16px;
					height: 40px;
				}
				/deep/ .el-upload--picture-card {
					background: transparent;
					border: 0;
					border-radius: 0;
					width: auto;
					height: auto;
					line-height: initial;
					vertical-align: middle;
				}
				/deep/ .upload .upload-img {
					border: 1px solid #ddd;
					cursor: pointer;
					border-radius: 0px;
					color: #999;
					background: #fff;
					object-fit: cover;
					width: 80px;
					font-size: 26px;
					line-height: 60px;
					text-align: center;
					height: 60px;
				}
				/deep/ .el-upload-list .el-upload-list__item {
					border: 1px solid #ddd;
					cursor: pointer;
					border-radius: 0px;
					color: #999;
					background: #fff;
					object-fit: cover;
					width: 80px;
					font-size: 26px;
					line-height: 60px;
					text-align: center;
					height: 60px;
					font-size: 14px;
					line-height: 1.8;
				}
				/deep/ .el-upload .el-icon-plus {
					border: 1px solid #ddd;
					cursor: pointer;
					border-radius: 0px;
					color: #999;
					background: #fff;
					object-fit: cover;
					width: 80px;
					font-size: 26px;
					line-height: 60px;
					text-align: center;
					height: 60px;
				}
				/deep/ .el-upload__tip {
					color: #888;
					font-size: 16px;
				}
				.el-textarea /deep/ .el-textarea__inner {
					border: 1px solid #ddd;
					border-radius: 0px;
					padding: 12px;
					box-shadow: none;
					color: inherit;
					width: auto;
					font-size: 16px;
					min-height: 150px;
					min-width: 48%;
					height: auto;
				}
				.el-textarea /deep/ .el-textarea__inner[readonly="readonly"] {
					border: 0px solid #ddd;
					cursor: not-allowed;
					border-radius: 0px;
					padding: 12px;
					box-shadow: none;
					color: inherit;
					background: none;
					width: auto;
					font-size: 16px;
					min-height: 150px;
					min-width: 50%;
					height: auto;
				}
				/deep/ .el-input__inner::placeholder {
					color: #9E9E9E;
					font-size: inherit;
				}
				/deep/ textarea::placeholder {
					color: #9E9E9E;
					font-size: inherit;
				}
				.editor {
					background-color: #fff;
					border-radius: 0;
					padding: 0;
					box-shadow: none;
					margin: 0;
					width: 80%;
					min-height: 250px;
					border-color: #ccc;
					border-width: 1px;
					border-style: solid;
					height: auto;
				}
				.upload-img {
					object-fit: cover;
					width: 100px;
					height: 100px;
				}
				.viewBtn {
					border: 0;
					cursor: pointer;
					border-radius: 0px;
					padding: 0 20px;
					margin: 0;
					color: #333;
					background: #03abe930;
					display: inline-block;
					width: auto;
					font-size: 14px;
					line-height: 34px;
					height: 34px;
				}
				.viewBtn:hover {
				}
				.unviewBtn {
					border: 0;
					cursor: pointer;
					padding: 0 20px;
					margin: 0;
					color: #333;
					display: inline-block;
					font-size: 14px;
					line-height: 34px;
					border-radius: 0px;
					outline: none;
					background: #ddd;
					width: auto;
					height: 34px;
				}
				.unviewBtn:hover {
					background: #eee;
				}
			}
			.add-btn-item {
				padding: 0;
				margin: 20px 0;
				.submitBtn {
					border: 0;
					cursor: pointer;
					padding: 0 15px;
					margin: 0 20px 0 0;
					display: inline-block;
					font-size: 16px;
					line-height: 40px;
					border-radius: 2px;
					background: #66B9BB;
					width: auto;
					text-align: center;
					min-width: 120px;
					height: 40px;
					.icon {
						color: #fff;
					}
					.text {
						color: #fff;
					}
				}
				.submitBtn:hover {
					opacity: 0.8;
					.icon {
					}
					.text {
					}
				}
				.closeBtn {
					border: 0px solid #ddd;
					cursor: pointer;
					padding: 0 15px;
					margin: 0 20px 0 0;
					display: inline-block;
					font-size: 16px;
					line-height: 40px;
					border-radius: 2px;
					background: #858585;
					width: auto;
					text-align: center;
					min-width: 110px;
					height: 40px;
					.icon {
						color: #fff;
					}
					.text {
						color: #fff;
					}
				}
				.closeBtn:hover {
					opacity: 0.8;
					.icon {
					}
					.text {
					}
				}
			}
		}
	}
	.el-date-editor.el-input {
		width: auto;
	}
</style>

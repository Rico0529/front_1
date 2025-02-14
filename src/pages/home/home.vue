<template>
	<div class="home-preview">



		<!-- 关于我们 -->
		<div id="about" class="animate__animated">
			<div class="about_item">
				<div class="about_title_box">
					<div class="about_title">{{aboutUsDetail.title}}</div>
					<div class="about_subtitle">{{aboutUsDetail.subtitle}}</div>
				</div>
				<div class="about_img">
					<img :src="baseUrl + aboutUsDetail.picture1">
					<img :src="baseUrl + aboutUsDetail.picture2">
					<img :src="baseUrl + aboutUsDetail.picture3">
				</div>
				<div class="about_content ql-snow ql-editor" v-html="aboutUsDetail.content"></div>
				<div class="about_idea1" />
				<div class="about_idea2" />
				<div class="about_idea3" />
				<div class="about_idea4" />
				<div class="about_more" @click="toDetail('aboutusDetail',aboutUsDetail)">
					<span>查看更多</span>
					<span class="icon iconfont icon-gengduo1"></span>
				</div>
			</div>
		</div>
		<!-- 关于我们 -->

		<!-- 系统简介 -->
		<div id="system" class="animate__animated">
			<div class="system_item">
				<div class="system_title_box">
					<div class="system_title">{{systemIntroductionDetail.title}}</div>
					<div class="system_subtitle">{{systemIntroductionDetail.subtitle}}</div>
				</div>
				<div class="system_img">
					<img :src="baseUrl + systemIntroductionDetail.picture1">
					<img :src="baseUrl + systemIntroductionDetail.picture2">
					<img :src="baseUrl + systemIntroductionDetail.picture3">
				</div>
				<div class="system_content ql-snow ql-editor" v-html="systemIntroductionDetail.content"></div>
				<div class="system_idea1" />
				<div class="system_idea2" />
				<div class="system_idea3" />
				<div class="system_idea4" />
				<div class="system_more" @click="toDetail('systemintroDetail',systemIntroductionDetail)">
					<span>查看更多</span>
					<span class="icon iconfont icon-gengduo1"></span>
				</div>
			</div>
		</div>
		<!-- 系统简介 -->
		<!-- 新闻资讯 -->
		<div id="animate_newsnews" class="news animate__animated">
			<div class="news_title_box">
				<span class="news_title">社保公告</span>
				<span class="news_subhead">{{'news'.toUpperCase()}}</span>
			</div>
			<div class="list list11 index-pv1">
				<div class="left_box">
					<div class="list-item" v-for="(item,index) in newsList" :key="index" v-if="index<Number(2)" @click="toDetail('newsDetail', item)">
						<div class="img"><img :src="baseUrl + item.picture" alt=""></div>
						<div class="infoBox">
							<div class="name">{{item.title}}</div>
							<div class="time">{{item.addtime}}</div>
							<div class="desc">{{ item.introduction }}</div>
						</div>
					</div>
				</div>
				<div class="right_box">
					<div class="list-item" :class="newsIndex11==index?'list-item-active':''" @click="newsTabClick11(index)"  v-for="(item,index) in newsList" :key="index" v-if="index>=Number(2)&&index<(Number(2) + Number(4))">
						<div class="name">{{item.title}}</div>
						<div class="list-item2" @click="toDetail('newsDetail', item)">
							<div class="desc">{{ item.introduction }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="moreBtn" @click="moreBtn('news')">
				<span class="text">查看更多</span>
				<i class="icon iconfont icon-gengduo1"></i>
			</div>
		</div>
		<!-- 新闻资讯 -->
	</div>
</template>

<script>
import 'animate.css'
import Swiper from "swiper";

	export default {
		//数据集合
		data() {
			return {
				baseUrl: '',
				aboutUsDetail: {},
				systemIntroductionDetail: {},
				newsList: [],


				newsIndex11: Number(2),



			}
		},
		created() {
			this.baseUrl = this.$config.baseUrl;
			this.getNewsList();
			this.getAboutUs();
			this.getSystemIntroduction();
			this.getList();
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
			setTimeout(()=>{
				this.handleScroll()
			},100)
			
			this.swiperChanges()
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		//方法集合
		methods: {
			newsTabClick11(index){
				this.newsIndex11 = index
			},
			swiperChanges() {
				setTimeout(()=>{
				},750)
			},


			handleScroll() {
				let arr = [
					{id:'about',css:'animate__'},
					{id:'system',css:'animate__'},
					{id:'animate_newsnews',css:'animate__'},
				]
			
				for (let i in arr) {
					let doc = document.getElementById(arr[i].id)
					if (doc) {
						let top = doc.offsetTop
						let win_top = window.innerHeight + window.pageYOffset
						// console.log(top,win_top)
						if (win_top > top && doc.classList.value.indexOf(arr[i].css) < 0) {
							// console.log(doc)
							doc.classList.add(arr[i].css)
						}
					}
				}
			},
			preHttp(str) {
				return str && str.substr(0,4)=='http';
			},
			getAboutUs() {
				this.$http.get('aboutus/detail/1', {}).then(res => {
					if(res.data.code == 0) {
						this.aboutUsDetail = res.data.data;
					}
				})
			},
			getSystemIntroduction() {
				this.$http.get('systemintro/detail/1', {}).then(res => {
					if(res.data.code == 0) {
						this.systemIntroductionDetail = res.data.data;
					}
				})
			},
			getNewsList() {
				let data = {
					page: 1,
					limit: 7,
					sort: 'addtime',
					order: 'desc'
				}
				this.$http.get('news/list', {params: data}).then(res => {
					if (res.data.code == 0) {
						this.newsList = res.data.data.list;
					
					}
				});
			},
			getList() {
				let autoSortUrl = "";
				let data = {}
			
			},
			toDetail(path, item) {
				this.$router.push({path: '/index/' + path, query: {id: item.id}});
			},
			moreBtn(path) {
				this.$router.push({path: '/index/' + path});
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.home-preview {
		margin: 0px auto;
		flex-direction: column;
		background: #fff;
		display: flex;
		width: 100%;
		#about {
			padding: 0px calc(50% - 625px);
			margin: 0;
			background: url(http://codegen.caihongy.cn/20241105/fec6af9d39bc4f278f92196e5dc7d882.webp) no-repeat bottom;
			width: 100%;
			position: relative;
			height: auto;
			order: 6;
			.about_item {
				padding: 0;
				margin: 0;
				z-index: 9;
				overflow: hidden;
				background: none;
				display: block;
				width: 100%;
				flex-wrap: wrap;
				.about_title_box {
					padding: 0;
					margin: 50px auto 0;
					background: none;
					width: 100%;
					position: relative;
					text-align: left;
					height: auto;
					.about_title {
						padding: 0;
						margin: 0 0 0px 0;
						color: #000000;
						background: none;
						display: inline-block;
						width: auto;
						font-size: 40px;
						line-height: inherit;
						height: auto;
					}
					.about_subtitle {
						margin: 0 0 10px;
						color: #5DB5B7;
						display: block;
						width: 100%;
						font-size: 30px;
						line-height: 1.5;
						text-align: left;
					}
				}
				.about_img {
					padding: 0;
					margin: 20px 0 0;
					background: none;
					display: flex;
					gap: 20px;
					width: auto;
					align-items: center;
					float: left;
					flex-wrap: wrap;
					height: 500px;
					img:nth-child(1) {
						margin: 0;
						object-fit: cover;
						display: block;
						width: 246px;
						height: 360px;
					}
					img:nth-child(2) {
						margin: 0;
						object-fit: cover;
						display: block;
						width: 246px;
						height: 360px;
					}
					img:nth-child(3) {
						margin: 0;
						object-fit: cover;
						display: block;
						width: 246px;
						height: 360px;
					}
				}
				.about_content {
					padding: 0;
					margin: auto;
					overflow: hidden;
					color: #000000;
					background: none;
					width: auto;
					font-size: 16px;
					line-height: 30px;
					float: right;
					height: auto;
				}
				.about_idea1 {
					z-index: -1;
					top: 0;
					background: url(http://codegen.caihongy.cn/20240809/4c886953e8824f4fbce50991f268e35d.png) no-repeat center top / cover;
					display: none;
					width: 100%;
					position: absolute;
					right: 0;
					height: 100%;
				}
				.about_idea2 {
					background: url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat;
					display: none;
					width: 285px;
					height: 100px;
				}
				.about_idea3 {
					background: url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat;
					display: none;
					width: 285px;
					height: 100px;
				}
				.about_idea4 {
					background: url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat;
					display: none;
					width: 285px;
					height: 100px;
				}
				.about_more {
					border: 0;
					cursor: pointer;
					margin: 80px 50px 0px 0px;
					top: 0;
					background: none;
					display: block;
					width: auto;
					line-height: 32px;
					position: absolute;
					right: calc(50% - 625px);
					border-bottom: 2px solid #5DB5B7;
					text-align: center;
					span:nth-child(1) {
						color: #9E9E9E;
						font-size: 15px;
					}
					span:nth-child(2) {
						color: #333;
						display: none;
						font-size: 15px;
					}
				}
				.about_more:hover {
					cursor: pointer;
					opacity: 1;
				}
			}
		}
		#system {
			padding: 0px calc(50% - 625px);
			background: url(http://codegen.caihongy.cn/20241105/fec6af9d39bc4f278f92196e5dc7d882.webp) no-repeat bottom;
			width: 100%;
			position: relative;
			height: auto;
			order: 3;
			.system_item {
				padding: 0;
				margin: 0;
				z-index: 9;
				overflow: hidden;
				background: none;
				display: block;
				width: 100%;
				flex-wrap: wrap;
				.system_title_box {
					padding: 0;
					margin: 50px auto 0;
					background: none;
					width: 100%;
					position: relative;
					text-align: left;
					height: auto;
					.system_title {
						padding: 0;
						margin: 0 0 0px 0;
						color: #000000;
						background: none;
						display: inline-block;
						width: auto;
						font-size: 40px;
						line-height: inherit;
						height: auto;
					}
					.system_subtitle {
						margin: 0 0 10px;
						color: #5DB5B7;
						display: block;
						width: 100%;
						font-size: 30px;
						line-height: 1.5;
						text-align: left;
					}
				}
				.system_img {
					padding: 0;
					margin: 20px 0 0;
					background: none;
					display: flex;
					gap: 20px;
					width: auto;
					align-items: center;
					float: left;
					flex-wrap: wrap;
					height: 500px;
					img:nth-child(1) {
						margin: 0;
						object-fit: cover;
						display: block;
						width: 246px;
						height: 360px;
					}
					img:nth-child(2) {
						margin: 0;
						object-fit: cover;
						display: block;
						width: 246px;
						height: 360px;
					}
					img:nth-child(3) {
						margin: 0;
						object-fit: cover;
						display: block;
						width: 246px;
						height: 360px;
					}
				}
				.system_content {
					padding: 0;
					margin: auto;
					overflow: hidden;
					color: #000000;
					background: none;
					width: auto;
					font-size: 16px;
					line-height: 30px;
					float: right;
					height: auto;
				}
				.system_idea1 {
					background: url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat;
					display: none;
					width: 285px;
					height: 100px;
				}
				.system_idea2 {
					background: url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat;
					display: none;
					width: 285px;
					height: 100px;
				}
				.system_idea3 {
					background: url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat;
					display: none;
					width: 285px;
					height: 100px;
				}
				.system_idea4 {
					background: url(http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg) 0% 0% / cover no-repeat;
					display: none;
					width: 285px;
					height: 100px;
				}
				.system_more {
					border: 0;
					cursor: pointer;
					margin: 80px 50px 0px 0px;
					top: 0;
					background: none;
					display: block;
					width: auto;
					line-height: 32px;
					position: absolute;
					right: calc(50% - 625px);
					border-bottom: 2px solid #5DB5B7;
					text-align: center;
					span:nth-child(1) {
						color: #9E9E9E;
						font-size: 15px;
					}
					span:nth-child(2) {
						color: #333;
						display: none;
						font-size: 15px;
					}
				}
				.system_more:hover {
					cursor: pointer;
					opacity: 1;
				}
			}
		}
		.news {
			padding: 30px calc(50% - 625px);
			margin: 0;
			background: url(http://codegen.caihongy.cn/20241105/c9ba40563845438b8dd19c83a96af3b4.webp) no-repeat bottom;
			width: 100%;
			position: relative;
			order: 1;
			.news_title_box {
				padding: 0;
				margin: 0;
				background: none;
				width: 100%;
				position: relative;
				text-align: left;
				height: auto;
				.news_title {
					padding: 0;
					margin: 0 0 0px 0;
					color: #000000;
					background: none;
					display: inline-block;
					width: auto;
					font-size: 40px;
					line-height: inherit;
					height: auto;
				}
				.news_subhead {
					margin: 0 0 10px;
					color: #5DB5B7;
					display: block;
					width: 100%;
					font-size: 30px;
					line-height: 1.5;
					text-align: left;
				}
			}
			.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
			.list11 {
				padding: 0;
				margin: 30px auto 0;
				overflow: hidden;
				background: none;
				display: flex;
				width: 100%;
				justify-content: space-between;
				.left_box {
					width: 48%;
					.list-item {
						border: none;
						cursor: pointer;
						padding: 0 0 25px;
						margin: 0;
						overflow: hidden;
						display: flex;
						width: 100%;
						border-width: 0;
						justify-content: space-between;
						.img {
							flex: 0 0 auto;
							width: 200px;
							height: 200px;
							img {
								object-fit: cover;
								width: 100%;
								transition: all 0.3s;
								height: 100%;
							}
						}
						.infoBox {
							padding: 20px;
							background: #F9F9F9;
							flex: 1 1 auto;
							width: 100%;
							.name {
								overflow: hidden;
								color: #666;
								white-space: nowrap;
								font-weight: 600;
								width: 100%;
								font-size: 16px;
								line-height: 26px;
								text-overflow: ellipsis;
							}
							.time {
								border-radius: 5px;
								margin: 10px 0;
								color: #fff;
								background: #5DB5B7;
								width: 150px;
								font-size: 14px;
								text-align: center;
							}
							.desc {
								overflow: hidden;
								color: #858585;
								line-height: 24px;
								height: 72px;
							}
						}
					}
					.list-item:hover {
						.img {
							img {
								transform: scale(1.05);
							}
						}
						.infoBox {
							.name {
								color: #5DB5B7;
							}
						}
					}
				}
				.right_box {
					padding: 0 0 0 30px;
					overflow: hidden;
					width: 48%;
					height: 418px;
					.list-item {
						position: relative;
						.name {
							cursor: pointer;
							padding: 0 50px 0 25px;
							overflow: hidden;
							color: #353535;
							white-space: nowrap;
							font-weight: normal;
							width: 100%;
							font-size: 15px;
							line-height: 40px;
							position: relative;
							text-overflow: ellipsis;
						}
						.name::before {
							color:  #666;
							top: 0;
							font-weight: normal;
							font-size: 22px;
							line-height: 40px;
							position: absolute;
							right: 25px;
							content: "+";
						}
						.list-item2 {
							border: 1px dashed #bbbbbb;
							padding: 0 25px;
							margin: 0;
							overflow: hidden;
							display: block;
							border-width: 0 0 1px;
							opacity: 0;
							transition: all 0.5s;
							height: 0;
							.desc {
								cursor: pointer;
								margin: 10px 0 0;
								overflow: hidden;
								color: #909090;
								font-size: 14px;
								line-height: 25px;
								height: 200px;
							}
						}
					}
					.list-item.list-item-active {
						.name {
							color: #FFF;
							background: #5DB5B7;
						}
						.name::before {
							color: #fff;
							content: "-";
						}
						.list-item2 {
							padding: 0 25px 16px;
							margin: 0 0 10px;
							display: block;
							opacity: 1;
							transition: all 0.5s;
							height: 174px;
						}
					}
				}
			}
			.moreBtn {
				border: 0;
				cursor: pointer;
				margin: 80px 50px 0px 0px;
				top: 0;
				background: none;
				display: block;
				width: auto;
				line-height: 32px;
				position: absolute;
				right: calc(50% - 625px);
				border-bottom: 2px solid #5DB5B7;
				text-align: center;
				.text {
					color: #9E9E9E;
					font-size: 15px;
				}
				.icon {
					color: #000;
					display: none;
					font-size: 15px;
				}
			}
		}
	}
</style>

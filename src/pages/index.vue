<template>
	<div class="main-container">
		<div class="body-container">
			<!-- 顶部导航 -->
			<header class="header-container">
				<div class="header-content">
					<h1 class="system-title" @click="goMenu('/index/home')">
						广州市劳动与社会保障信息管理系统
					</h1>

					<el-dropdown class="user-dropdown" @command="handleCommand" trigger="click">
						<div class="user-panel">
							<template v-if="Token">
								<el-avatar :src="headportrait ? baseUrl + headportrait : require('@/assets/avator.png')"
									class="user-avatar" />
								<span class="user-name">{{ username }}</span>
								<i class="el-icon-arrow-down"></i>
							</template>
							<el-button v-else type="primary" class="login-btn" @click="toLogin">
								登录
							</el-button>
						</div>

						<el-dropdown-menu slot="dropdown" v-if="Token">
							<el-dropdown-item command="service">
								<i class="el-icon-service"></i>客服中心
							</el-dropdown-item>
							<el-dropdown-item v-if="notAdmin" command="user">
								<i class="el-icon-user"></i>个人中心
							</el-dropdown-item>
							<el-dropdown-item command="register" divided>
								<i class="el-icon-switch-button"></i>退出登录
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</header>

			<!-- 导航菜单 -->
			<nav class="nav-container">
				<div class="nav-menu">
					<div class="menu-item" :class="{ 'active': activeMenu === '/index/home' }"
						@click="goMenu('/index/home')">
						<i class="el-icon-s-home"></i>
						<span>系统首页</span>
					</div>

					<div v-for="(item, index) in menuList" :key="index" class="menu-item" :class="{
						'active': activeMenu === item.url,
						'has-child': item.hasCate
					}" @mouseenter="menuShowClick4(index)" @mouseleave="menuShowClick4(-1)" @click.stop="goMenu(item.url)">
						<i :class="iconArr[index]"></i>
						<span>{{ item.name }}</span>

						<transition name="el-zoom-in-top">
							<div v-if="showType4 === index && item.hasCate" class="submenu">
								<div v-for="(subItem, subIndex) in item.cateList" :key="subIndex" class="submenu-item"
									@click.stop="cateClick(item.url, subItem)">
									{{ subItem }}
								</div>
							</div>
						</transition>
					</div>
				</div>
			</nav>

			<!-- 轮播图 -->
			<!-- <section class="carousel-container" v-if="carouselList.length && carouselChange()">
				<swiper class="custom-swiper" :options="swiperOptions">
					<swiper-slide v-for="item in carouselList" :key="item.id" @click.native="carouselClick(item.url)">
						<el-image :src="preHttp(item.value) ? item.value : baseUrl + item.value" fit="cover"
							class="carousel-image" />
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
					<div class="swiper-button-prev" slot="button-prev"></div>
					<div class="swiper-button-next" slot="button-next"></div>
				</swiper>
			</section> -->
			<section class="carousel-container" v-if="carouselList.length > 0 && carouselChange()">
				<swiper ref="mySwiper" :options="swiperOptions" class="custom-swiper">
					<swiper-slide v-for="(item, index) in carouselList" :key="index"
						@click.native="carouselClick(item.url)">
						<el-image :src="preHttp(item.value) ? item.value : baseUrl + item.value" fit="cover"
							class="carousel-image" />
					</swiper-slide>

					<!-- 分页器 -->
					<div class="swiper-pagination" slot="pagination"></div>

					<!-- 导航按钮 -->
					<div class="swiper-button-prev" slot="button-prev">
						<i class="el-icon-arrow-left"></i>
					</div>
					<div class="swiper-button-next" slot="button-next">
						<i class="el-icon-arrow-right"></i>
					</div>
				</swiper>
			</section>


			<!-- 主内容 -->
			<main class="content-container">
				<router-view id="router-view"></router-view>
			</main>

			<!-- 底部信息 -->
			<footer class="footer-container">
				<div class="footer-content" v-html="bottomContent"></div>
			</footer>
			<!-- 客服对话框 -->
			<el-dialog title="客服中心" :visible.sync="chatFormVisible" width="800px" :before-close="chatClose"
				class="chat-dialog">
				<!-- 聊天内容区域 -->
				<div class="chat-container">
					<div class="message-list" ref="messageList">
						<div v-for="(item, index) in chatList" :key="index"
							:class="['message-item', item.ask ? 'user-message' : 'service-message']">
							<!-- 时间显示 -->
							<div v-if="item.addtime" class="message-time">
								{{ timeFormat(item.addtime) }}
							</div>

							<!-- 消息内容 -->
							<div class="message-content">
								<!-- 头像 -->
								<el-avatar :src="item.uimage ? baseUrl + item.uimage : require('@/assets/avator.png')"
									class="message-avatar" />

								<!-- 消息主体 -->
								<div class="message-body">
									<!-- 文字消息 -->
									<template v-if="item.type === 1">
										<div class="bubble">
											{{ item.ask || item.reply }}
										</div>
									</template>

									<!-- 图片消息 -->
									<template v-else-if="item.type === 2">
										<el-image :src="baseUrl + (item.ask || item.reply)" class="message-image"
											:preview-src-list="[baseUrl + (item.ask || item.reply)]" />
									</template>

									<!-- 文件消息 -->
									<template v-else-if="item.type === 4">
										<div class="file-message">
											<i class="el-icon-document"></i>
											<span class="file-name">{{ item.ask || item.reply | fileName }}</span>
											<el-button type="text" @click="download(item.ask || item.reply)">
												下载
											</el-button>
										</div>
									</template>
								</div>
							</div>
						</div>
					</div>

					<!-- 输入区域 -->
					<div class="input-area">
						<div class="action-buttons">
							<el-upload class="upload-btn" :action="uploadUrl" :show-file-list="false"
								:on-success="uploadSuccess">
								<el-button type="text" icon="el-icon-picture-outline"></el-button>
							</el-upload>

							<el-upload class="upload-btn" :action="uploadUrl" :show-file-list="false"
								:on-success="uploadSuccess2">
								<el-button type="text" icon="el-icon-video-camera"></el-button>
							</el-upload>

							<el-upload class="upload-btn" :action="uploadUrl" :show-file-list="false"
								:on-success="uploadSuccess3">
								<el-button type="text" icon="el-icon-folder-opened"></el-button>
							</el-upload>

							<el-button type="text" @click="showEmoji = !showEmoji">😀</el-button>
						</div>

						<!-- 表情选择器 -->
						<div class="emoji-picker" v-if="showEmoji">
							<picker :include="['people', 'Smileys']" @select="addEmoji"
								:backgroundImageFn="emojiBackground" />
						</div>

						<!-- 输入框 -->
						<el-input v-model="form.ask" type="textarea" :rows="3" placeholder="输入消息..."
							@keydown.enter.native.prevent="addChat(null)" class="message-input"></el-input>

						<el-button type="primary" @click="addChat(null)" class="send-button">
							发送
						</el-button>
					</div>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
// 保持原有import部分不变
import { Picker } from "emoji-mart-vue";
import timeMethod from '@/common/timeMethod'
import { WebsocketMixin } from '@/mixins/WebsocketMixin'
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// 增加axios导入
import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$http = axios

export default {
	components: {
		Picker,
		Swiper,
		SwiperSlide
	},
	mixins: [WebsocketMixin],
	data() {
		return {
			// swiperOptions: {
			// 	pagination: {
			// 		el: '.swiper-pagination',
			// 		clickable: true
			// 	},
			// 	navigation: {
			// 		nextEl: '.swiper-button-next',
			// 		prevEl: '.swiper-button-prev'
			// 	},
			// 	autoplay: {
			// 		delay: 3000,
			// 		disableOnInteraction: false
			// 	},
			// 	loop: true
			// },
			swiperOptions: {
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				// 响应式配置
				breakpoints: {
					768: {
						slidesPerView: 1,
						spaceBetween: 10
					}
				}
			},
			// 其他原有data保持不变
			activeIndex: '0',
			baseUrl: '',
			carouselList: [],
			carouselForm: {
				inHome: true,
				inOther: true,
			},
			menuList: [],
			chatFormVisible: false,
			chatList: [],
			headers: {
				Token: localStorage.getItem('frontToken')
			},
			uploadUrl: this.$config.baseUrl + 'file/upload',
			askShow: false,
			showEmoji: false,
			form: {
				ask: '',
			},
			headportrait: localStorage.getItem('frontHeadportrait') ? localStorage.getItem('frontHeadportrait') : '',
			Token: localStorage.getItem('frontToken'),
			username: localStorage.getItem('username'),
			notAdmin: localStorage.getItem('frontSessionTable') != '"users"',
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],
			bottomContent: '',
			remindVisibie: false,
			remindForm: {},
			timesAll: null,
			timesOnce: null,
			showType4: -1,
		}
	},
	// 原有methods、生命周期等保持不变
	async created() {
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
		this.getCarousel();
		if (localStorage.getItem('frontToken') && localStorage.getItem('frontToken') != null) {
			this.getSession()
			this.getRecommendAll()
			this.getRecommendOnce()
		}
		this.cateList = this.$config.cateList
		if (this.cateList.length) {
			for (let x in this.menuList) {
				for (let i in this.cateList) {
					if (this.menuList[x].name == this.cateList[i].name) {
						await this.$http.get(`option/${this.cateList[i].refTable}/${this.cateList[i].refColumn}`).then(rs => {
							this.menuList[x].cateList = rs.data.data
							this.menuList[x].hasCate = true
						})
					}
				}
			}
		}
	},
	mounted() {
		this.activeIndex = localStorage.getItem('keyPath') || '0';
		this.$nextTick(() => {
			new Swiper(".custom-swiper", this.swiperOptions)
		})


		// banner
		setTimeout(() => {
			new Swiper(".mySwiper3", { "navigation": { "nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev" }, "autoplay": { "delay": 2500, "disableOnInteraction": false }, "pagination": { "el": ".swiper-pagination", "clickable": true } })
		}, 500)

	},
	destroyed() {
		clearTimeout(this.timesAll)
		clearTimeout(this.timesOnce)
	},
	computed: {
		activeMenu() {
			const route = this.$route
			const {
				meta,
				path
			} = route
			// if st path, the sidebar will highlight the path you sete
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
	},
	watch: {
		$route(newValue) {
			let that = this
			let url = window.location.href
			let arr = url.split('#')
			for (let x in this.menuList) {
				if (newValue.path == this.menuList[x].url) {
					this.activeIndex = x
				}
			}
			this.Token = localStorage.getItem('frontToken')
			if (arr[1] != '/index/home') {
				var element = document.getElementById('scrollView');
				var distance = element.offsetTop;
				window.scrollTo(0, distance)
			} else {
				window.scrollTo(0, 0)
			}
		},
		headportrait() {
			this.$forceUpdate()
		},
	},
	methods: {
		cateClick(url, fenlei) {
			this.$router.push(url + '?homeFenlei=' + fenlei);
		},
		preHttp(str) {
			return str && str.substr(0, 4) == 'http';
		},
		compareDate(s1, s2) {
			return ((new Date(s1.replace(/-/g, "\/"))) > (new Date(s2.replace(/-/g, "\/"))));
		},
		async getRecommendAll() {
			let that = this
			this.$http.get('popupremind/list', { params: { type: '全局' } }).then(async res => {
				if (res.data && res.data.code == 0) {
					for (let x in res.data.data.list) {
						if (this.compareDate(this.getCurDateTime(), res.data.data.list[x]
							.remindtime)) {
							await this.$http.get('storeup/page', { params: { refid: res.data.data.list[x].id, tablename: 'popupremind', type: '61' } }).then(obj => {
								if (obj.data && obj.data.code == 0) {
									if (!obj.data.data.list.length) {
										res.data.data.list[x].content = res.data.data.list[x].content.replace(/img src/gi, "img style=\"width:100%;\" src");
										this.$notify({
											title: res.data.data.list[x].title,
											dangerouslyUseHTMLString: true,
											message: res.data.data.list[x].brief,
											duration: 0,
											position: 'bottom-right',
											onClick() {
												that.remindForm = res.data.data.list[x]
												that.remindVisibie = true
											}
										})
										this.$http.post('storeup/add', {
											userid: Number(localStorage.getItem('frontUserid')),
											refid: res.data.data.list[x].id,
											tablename: 'popupremind',
											name: res.data.data.list[x].title,
											type: '61',
										})
									}
								}
							})
						}
					}
					this.timesAll = setTimeout(() => {
						this.getRecommendAll()
					}, 10000)
				}
			})
		},
		async getRecommendOnce() {
			let that = this
			this.$http.get('popupremind/page', { params: { type: '个人' } }).then(async res => {
				if (res.data && res.data.code == 0) {
					for (let x in res.data.data.list) {
						if (this.compareDate(this.getCurDateTime(), res.data.data.list[x]
							.remindtime)) {
							await this.$http.get('storeup/page', { params: { refid: res.data.data.list[x].id, tablename: 'popupremind', type: '61' } }).then(obj => {
								if (obj.data && obj.data.code == 0) {
									if (!obj.data.data.list.length) {
										res.data.data.list[x].content = res.data.data.list[x].content.replace(/img src/gi, "img style=\"width:100%;\" src");
										this.$notify({
											title: res.data.data.list[x].title,
											dangerouslyUseHTMLString: true,
											message: res.data.data.list[x].brief,
											duration: 0,
											position: 'top-right',
											onClick() {
												that.remindForm = res.data.data.list[x]
												that.remindVisibie = true
											}
										})
										this.$http.post('storeup/add', {
											userid: Number(localStorage.getItem('frontUserid')),
											refid: res.data.data.list[x].id,
											tablename: 'popupremind',
											name: res.data.data.list[x].title,
											type: '61',
										})
									}
								}
							})
						}
					}
					this.timesOnce = setTimeout(() => {
						this.getRecommendOnce()
					}, 10000)
				}
			})
		},

		async getSession() {
			await this.$http.get(`${localStorage.getItem('UserTableName')}/session`, { emulateJSON: true }).then(async res => {
				if (res.data.code == 0) {
					localStorage.setItem('sessionForm', JSON.stringify(res.data.data))
					localStorage.setItem('frontUserid', res.data.data.id);
					if (res.data.data.vip) {
						localStorage.setItem('vip', res.data.data.vip);
					}
					if (res.data.data.touxiang) {
						this.headportrait = res.data.data.touxiang
						localStorage.setItem('frontHeadportrait', res.data.data.touxiang);
					} else if (res.data.data.headportrait) {
						this.headportrait = res.data.data.headportrait
						localStorage.setItem('frontHeadportrait', res.data.data.headportrait);
					}
				}
			});
		},
		handleSelect(keyPath) {
			if (keyPath) {
				localStorage.setItem('keyPath', keyPath)
			}
		},
		toLogin() {
			this.$router.push('/login');
		},
		logout() {
			localStorage.clear();
			Vue.http.headers.common['Token'] = "";
			this.$router.push('/index/home');
			this.activeIndex = '0'
			localStorage.setItem('keyPath', this.activeIndex)
			this.Token = ''
			this.$forceUpdate()
			this.$message({
				message: '登出成功',
				type: 'success',
				duration: 1000,
			});
		},
		getCarousel() {
			this.$http.get('config/list', { params: { page: 1, limit: 3 } }).then(res => {
				if (res.data.code == 0) {
					this.carouselList = res.data.data.list;
				}
			});
		},
		// 轮播图跳转
		carouselClick(url) {
			if (url) {
				if (url.indexOf('https') != -1) {
					window.open(url)
				} else {
					this.$router.push(url)
				}
			}
		},
		carouselChange() {
			let url = window.location.href
			let arr = url.split('#')
			return (this.carouselForm.inHome && arr[1] == '/index/home') || (this.carouselForm.inOther && arr[1] != '/index/home')
		},
		goBackend() {
			localStorage.setItem('Token', localStorage.getItem('frontToken'));
			localStorage.setItem('role', localStorage.getItem('frontRole'));
			localStorage.setItem('sessionTable', localStorage.getItem('frontSessionTable'));
			localStorage.setItem('headportrait', localStorage.getItem('frontHeadportrait'));
			localStorage.setItem('userid', localStorage.getItem('frontUserid'));
			window.location.href = `${this.$config.baseUrl}admin/dist/index.html`

		},
		formatMessages(messages) {
			let lastTime = null;
			messages.forEach((message, index) => {
				const currentTime = new Date(message.addtime).getTime();
				if (lastTime !== null) {
					const timeDiff = (currentTime - lastTime) / 1000 / 60; // 转换为分钟
					if (timeDiff < 3) {
						message.addtime = ''; // 如果小于3分钟，不显示时间
					}
				}
				lastTime = currentTime;
			});
			return messages;
		},
		timeFormat(time) {
			const Time = timeMethod.getTime(time).split("T");
			//当前消息日期属于周
			const week = timeMethod.getDateToWeek(time);
			//当前日期0时
			const nti = timeMethod.setTimeZero(timeMethod.getNowTime());
			//消息日期当天0时
			const mnti = timeMethod.setTimeZero(timeMethod.getTime(time));
			//计算日期差值
			const diffDate = timeMethod.calculateTime(nti, mnti);
			//本周一日期0时 （后面+1是去除当天时间）
			const fwnti = timeMethod.setTimeZero(timeMethod.countDateStr(-timeMethod.getDateToWeek(timeMethod
				.getNowTime()).weekID + 1));
			//计算周日期差值
			const diffWeek = timeMethod.calculateTime(mnti, fwnti);

			if (diffDate === 0) { //消息发送日期减去当天日期如果等于0则是当天时间
				return Time[1].slice(0, 5);
			} else if (diffDate < 172800000) { //当前日期减去消息发送日期小于2天（172800000ms）则是昨天-  一天最大差值前天凌晨00:00:00到今天晚上23:59:59
				return "昨天 " + Time[1].slice(0, 5);
			} else if (diffWeek >= 0) { //消息日期减去本周一日期大于0则是本周
				return week.weekName;
			} else { //其他时间则是日期
				return Time[0].slice(5, 10);
			}
		},
		addEmoji(e) {
			this.form.ask += e.native;
			this.showEmoji = false
		},
		getChatList() {
			this.$http.get('chat/list', { params: { userid: Number(localStorage.getItem('frontUserid')), sort: 'addtime', order: 'asc', limit: 1000 } }).then(res => {
				if (res.data.code == 0) {
					this.chatList = this.formatMessages(res.data.data.list);
					let div = document.getElementsByClassName('chat-content')[0]
					setTimeout(() => {
						if (div) {
							div.scrollTop = div.scrollHeight
						}
					}, 0)
				}
			});
		},
		addChat(ask = null, type = 1) {
			let params = JSON.parse(JSON.stringify(this.form))
			if (params.ask == '' && ask == null) {
				this.$message.error('内容不能为空')
				return false
			}
			if (ask) {
				params.ask = ask
			}
			params.type = type
			params.uimage = localStorage.getItem('frontHeadportrait')
			params.uname = localStorage.getItem('username')
			params.userid = Number(localStorage.getItem('frontUserid'))
			this.$http.post('chat/add', params).then(res => {
				if (res.data.code == 0) {
					this.websocketSend(ask ? ask : params.ask)
					this.form.ask = '';
					this.getChatList();
				}
			});
		},
		chatClose() {
			if (this.askType == 2) {
				this.websocketOnclose();
			}
			this.chatFormVisible = false;
		},
		websocketOnmessage: function (e) {
			this.getChatList()
		},
		goChat() {
			if (!localStorage.getItem('frontToken')) {
				this.toLogin();
				return;
			}

			this.initWebSocket(1)
			this.getChatList();
			this.chatFormVisible = true;
		},
		uploadSuccess(res) {
			if (res.code == 0) {
				this.askShow = !this.askShow;
				this.addChat('upload/' + res.file, 2)
			}
		},
		uploadSuccess2(res) {
			if (res.code == 0) {
				this.askShow = !this.askShow;
				this.addChat('upload/' + res.file, 3)
			}
		},
		uploadSuccess3(res) {
			if (res.code == 0) {
				this.askShow = !this.askShow;
				this.addChat('upload/' + res.file, 4)
			}
		},
		download(url) {
			if (!url) {
				return false
			}
			window.open((location.href.split(this.$config.name).length > 1 ? location.href.split(this.$config.name)[0] + this.$config.name + '/' + url : this.$config.baseUrl + url))
		},
		menuShowClick4(index) {
			this.showType4 = index
		},
		goMenu(path) {
			this.$router.push(path);
		},
		handleCommand(name) {
			if (name == 'register') {
				this.logout()
			}
			else if (name == 'service') {
				this.goChat()
			}
			else if (name == 'user') {
				this.goMenu('/index/center')
			}
			else if (name == 'login') {
				this.toLogin()
			}
		},
		filters: {
			fileName(value) {
				return value ? value.split('/').pop() : ''
			}
		},
		methods: {
			emojiBackground() {
				return require('@/assets/32.png')
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.$swiper
			}
		},
		mounted() {
			// 自动播放启动
			this.swiper.autoplay.start()
		}
	}
}
</script>

<style lang="scss" scoped>
/* 颜色变量 */
//   @import '~swiper/swiper-bundle.css';
$primary-color: #409EFF;
$hover-color: #66b1ff;
$bg-color: #f5f7fa;
$text-color: #303133;
$border-color: #ebeef5;
$user-bg: #e1f3ff;
$service-bg: #f5f7fa;

.main-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background: $bg-color;
}

.header-container {
	background: white;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
	padding: 0 24px;

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.system-title {
		font-size: 24px;
		color: $primary-color;
		cursor: pointer;
		margin: 0;
		font-weight: 500;
		transition: color 0.3s;

		&:hover {
			color: $hover-color;
		}
	}

	.user-dropdown {
		.user-panel {
			display: flex;
			align-items: center;
			cursor: pointer;
			padding: 8px 12px;
			border-radius: 4px;
			transition: background 0.3s;

			&:hover {
				background: rgba($primary-color, 0.1);
			}
		}

		.user-avatar {
			margin-right: 8px;
		}

		.user-name {
			margin-right: 6px;
			font-size: 14px;
		}

		.login-btn {
			padding: 8px 20px;
		}
	}
}

.nav-container {
	background: white;
	border-bottom: 1px solid $border-color;

	.nav-menu {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		height: 56px;
		justify-content: center;

		.menu-item {
			position: relative;
			padding: 0 20px;
			height: 100%;
			display: flex;
			align-items: center;
			cursor: pointer;
			transition: all 0.3s;
			color: $text-color;

			i {
				margin-right: 6px;
				font-size: 18px;
			}

			&:hover,
			&.active {
				color: $primary-color;
				background: rgba($primary-color, 0.1);
			}

			&.has-child::after {
				content: "›";
				margin-left: 4px;
				transform: rotate(90deg);
				font-size: 16px;
			}

			.submenu {
				position: absolute;
				top: 100%;
				left: 0;
				background: white;
				box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
				min-width: 160px;
				z-index: 1000;

				&-item {
					padding: 12px 20px;
					transition: all 0.3s;

					&:hover {
						background: rgba($primary-color, 0.1);
						color: $primary-color;
					}
				}
			}
		}
	}
}

.carousel-container {
  margin: 20px auto;
  max-width: 1200px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);

  .custom-swiper {
    .carousel-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    // 导航按钮样式
    .swiper-button-prev,
    .swiper-button-next {
      width: 40px;
      height: 40px;
      background: rgba(0,0,0,0.3);
      border-radius: 50%;
      transition: all 0.3s;
      
      &::after {
        display: none;
      }

      i {
        color: white;
        font-size: 20px;
      }

      &:hover {
        background: rgba(0,0,0,0.5);
      }
    }

    // 分页器样式
    .swiper-pagination {
      &-bullet {
        width: 10px;
        height: 10px;
        background: #fff;
        opacity: 0.5;
        
        &-active {
          opacity: 1;
          background: #409EFF;
        }
      }
    }
  }
}

.content-container {
	flex: 1;
	max-width: 1200px;
	margin: 24px auto;
	padding: 0 24px;
}

.footer-container {
	background: $text-color;
	color: white;
	padding: 24px 0;
	margin-top: auto;

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
		line-height: 1.6;
		font-size: 14px;
	}
}

.chat-dialog {
	::v-deep .el-dialog {
		border-radius: 8px;
		overflow: hidden;

		&__header {
			background: $primary-color;
			padding: 16px 24px;

			.el-dialog__title {
				color: white;
				font-size: 18px;
			}
		}

		&__body {
			padding: 0;
		}
	}
}

.chat-container {
	height: 60vh;
	display: flex;
	flex-direction: column;

	.message-list {
		flex: 1;
		overflow-y: auto;
		padding: 16px;
		background: #fafafa;

		.message-item {
			margin-bottom: 16px;

			.message-time {
				text-align: center;
				color: #999;
				font-size: 12px;
				margin: 8px 0;
			}

			.message-content {
				display: flex;
				align-items: flex-start;
				max-width: 80%;

				.message-avatar {
					flex-shrink: 0;
					margin: 0 8px;
				}

				.message-body {
					.bubble {
						padding: 12px 16px;
						border-radius: 12px;
						line-height: 1.5;
						max-width: 500px;
						word-break: break-word;
					}

					.message-image {
						max-width: 200px;
						border-radius: 8px;
						cursor: pointer;
					}

					.file-message {
						padding: 12px;
						background: white;
						border-radius: 8px;
						border: 1px solid #eee;
						display: flex;
						align-items: center;

						.file-name {
							margin: 0 12px;
							max-width: 200px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}

			&.user-message {
				.message-content {
					flex-direction: row-reverse;
					margin-left: auto;

					.bubble {
						background: $user-bg;
						border-top-right-radius: 4px;
					}
				}
			}

			&.service-message {
				.message-content {
					.bubble {
						background: $service-bg;
						border-top-left-radius: 4px;
					}
				}
			}
		}
	}

	.input-area {
		border-top: 1px solid #eee;
		padding: 16px;
		position: relative;

		.action-buttons {
			// margin-bottom: 8px;
			display: flex;
			/* 使用 flexbox 布局 */
			flex-direction: row;
			/* 元素横向排列 */
			gap: 10px;
			/* 按钮之间的间距 */

			.el-button {
				font-size: 18px;
				color: #666;
				padding: 4px 8px;

				&:hover {
					color: $primary-color;
				}
			}
		}

		.emoji-picker {
			position: absolute;
			bottom: 80px;
			right: 16px;
			z-index: 1000;
			box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
		}

		.message-input {
			::v-deep .el-textarea__inner {
				border-radius: 8px;
				resize: none;
			}
		}

		.send-button {
			margin-top: 12px;
			width: 100%;
			padding: 12px;
			border-radius: 8px;
		}
	}
}
</style>
import VueRouter from 'vue-router'
//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import qiyeList from '../pages/qiye/list'
import qiyeDetail from '../pages/qiye/detail'
import qiyeAdd from '../pages/qiye/add'
import laodongbaozhangList from '../pages/laodongbaozhang/list'
import laodongbaozhangDetail from '../pages/laodongbaozhang/detail'
import laodongbaozhangAdd from '../pages/laodongbaozhang/add'
import yewuyuyueList from '../pages/yewuyuyue/list'
import yewuyuyueDetail from '../pages/yewuyuyue/detail'
import yewuyuyueAdd from '../pages/yewuyuyue/add'
import shebaoxinxiList from '../pages/shebaoxinxi/list'
import shebaoxinxiDetail from '../pages/shebaoxinxi/detail'
import shebaoxinxiAdd from '../pages/shebaoxinxi/add'
import shebaojiaofeiList from '../pages/shebaojiaofei/list'
import shebaojiaofeiDetail from '../pages/shebaojiaofei/detail'
import shebaojiaofeiAdd from '../pages/shebaojiaofei/add'
import zhaopinxinxiList from '../pages/zhaopinxinxi/list'
import zhaopinxinxiDetail from '../pages/zhaopinxinxi/detail'
import zhaopinxinxiAdd from '../pages/zhaopinxinxi/add'
import toudijianliList from '../pages/toudijianli/list'
import toudijianliDetail from '../pages/toudijianli/detail'
import toudijianliAdd from '../pages/toudijianli/add'
import shenqingbutieList from '../pages/shenqingbutie/list'
import shenqingbutieDetail from '../pages/shenqingbutie/detail'
import shenqingbutieAdd from '../pages/shenqingbutie/add'
import butiefafangList from '../pages/butiefafang/list'
import butiefafangDetail from '../pages/butiefafang/detail'
import butiefafangAdd from '../pages/butiefafang/add'
import butieshenqingList from '../pages/butieshenqing/list'
import butieshenqingDetail from '../pages/butieshenqing/detail'
import butieshenqingAdd from '../pages/butieshenqing/add'
import fafangbutieList from '../pages/fafangbutie/list'
import fafangbutieDetail from '../pages/fafangbutie/detail'
import fafangbutieAdd from '../pages/fafangbutie/add'
import syslogList from '../pages/syslog/list'
import syslogDetail from '../pages/syslog/detail'
import syslogAdd from '../pages/syslog/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import popupremindList from '../pages/popupremind/list'
import popupremindDetail from '../pages/popupremind/detail'
import popupremindAdd from '../pages/popupremind/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'qiye',
					component: qiyeList
				},
				{
					path: 'qiyeDetail',
					component: qiyeDetail
				},
				{
					path: 'qiyeAdd',
					component: qiyeAdd
				},
				{
					path: 'laodongbaozhang',
					component: laodongbaozhangList
				},
				{
					path: 'laodongbaozhangDetail',
					component: laodongbaozhangDetail
				},
				{
					path: 'laodongbaozhangAdd',
					component: laodongbaozhangAdd
				},
				{
					path: 'yewuyuyue',
					component: yewuyuyueList
				},
				{
					path: 'yewuyuyueDetail',
					component: yewuyuyueDetail
				},
				{
					path: 'yewuyuyueAdd',
					component: yewuyuyueAdd
				},
				{
					path: 'shebaoxinxi',
					component: shebaoxinxiList
				},
				{
					path: 'shebaoxinxiDetail',
					component: shebaoxinxiDetail
				},
				{
					path: 'shebaoxinxiAdd',
					component: shebaoxinxiAdd
				},
				{
					path: 'shebaojiaofei',
					component: shebaojiaofeiList
				},
				{
					path: 'shebaojiaofeiDetail',
					component: shebaojiaofeiDetail
				},
				{
					path: 'shebaojiaofeiAdd',
					component: shebaojiaofeiAdd
				},
				{
					path: 'zhaopinxinxi',
					component: zhaopinxinxiList
				},
				{
					path: 'zhaopinxinxiDetail',
					component: zhaopinxinxiDetail
				},
				{
					path: 'zhaopinxinxiAdd',
					component: zhaopinxinxiAdd
				},
				{
					path: 'toudijianli',
					component: toudijianliList
				},
				{
					path: 'toudijianliDetail',
					component: toudijianliDetail
				},
				{
					path: 'toudijianliAdd',
					component: toudijianliAdd
				},
				{
					path: 'shenqingbutie',
					component: shenqingbutieList
				},
				{
					path: 'shenqingbutieDetail',
					component: shenqingbutieDetail
				},
				{
					path: 'shenqingbutieAdd',
					component: shenqingbutieAdd
				},
				{
					path: 'butiefafang',
					component: butiefafangList
				},
				{
					path: 'butiefafangDetail',
					component: butiefafangDetail
				},
				{
					path: 'butiefafangAdd',
					component: butiefafangAdd
				},
				{
					path: 'butieshenqing',
					component: butieshenqingList
				},
				{
					path: 'butieshenqingDetail',
					component: butieshenqingDetail
				},
				{
					path: 'butieshenqingAdd',
					component: butieshenqingAdd
				},
				{
					path: 'fafangbutie',
					component: fafangbutieList
				},
				{
					path: 'fafangbutieDetail',
					component: fafangbutieDetail
				},
				{
					path: 'fafangbutieAdd',
					component: fafangbutieAdd
				},
				{
					path: 'syslog',
					component: syslogList
				},
				{
					path: 'syslogDetail',
					component: syslogDetail
				},
				{
					path: 'syslogAdd',
					component: syslogAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'popupremind',
					component: popupremindList
				},
				{
					path: 'popupremindDetail',
					component: popupremindDetail
				},
				{
					path: 'popupremindAdd',
					component: popupremindAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})

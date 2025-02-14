export default {
	baseUrl: 'http://localhost:8080/GZIM_SYS/',
	name: '/GZIM_SYS',
	indexNav: [
		{
			name: '劳动保障',
			url: '/index/laodongbaozhang',
		},
		{
			name: '招聘信息',
			url: '/index/zhaopinxinxi',
		},
		{
			name: '社保公告',
			url: '/index/news'
		},
	],
	cateList: [
		{
			name: '社保公告',
			refTable: 'newstype',
			refColumn: 'typename',
		},
	]
}

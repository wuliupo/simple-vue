~function () {
    window.SIMPLE_VUE = window.SIMPLE_VUE || {};
    var loader = window.SIMPLE_VUE.loader;
    var common = {name: 'page-common', template: '<router-view class="page-common">Loading...</router-view>'}
    window.SIMPLE_VUE.routes = [{
            path: '/',
            name: '',
            redirect: '/home',
        },
        {
            path: '/home',
            component: loader,
            name: 'home',
            meta: {
                nav: '首页',
                tmpl: 'pages/home/home.html',
                js: 'pages/home/home.js',
                css: 'pages/home/home.css'
            }
        },
        {
            path: '/about',
            component: loader,
            name: 'about',
            meta: {
                nav: '关于',
                tmpl: 'pages/about/about.html',
                css: 'pages/about/about.css'
            }
        },
        {
            path: '/post',
            component: common,
            name: '',
            meta: {
                nav: '日志'
            },
            children: [
                {
                    path: '',
                    component: loader,
                    name: 'post-list',
                    meta: {
                        nav: '日志列表',
                        tmpl: 'pages/post/post-list.html',
                        js: 'pages/post/post-list.js',
                        css: 'pages/post/post.css'
                    }
                },
                {
                    path: ':id',
                    component: loader,
                    name: 'post-detail',
                    meta: {
                        nav: '日志正文',
                        tmpl: 'pages/post/post-detail.html',
                        js: 'pages/post/post-detail.js',
                        css: 'pages/post/post.css'
                    }
                }
            ]
        },
        {
            path: '/404',
            component: loader,
            name: '404',
            meta: {
                tmpl: 'pages/404.html'
            }
        },
        {
            path: '*',
            redirect: {
                path: '/404'
            }
        }
    ];
}();

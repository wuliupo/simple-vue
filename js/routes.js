~function () {
    window.SIMPLE_VUE = window.SIMPLE_VUE || {};
    var loader = window.SIMPLE_VUE.loader;
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
                tmpl: '/pages/home/home.html',
                js: '/pages/home/home.js',
                css: '/pages/home/home.css'
            }
        },
        {
            path: '/about',
            component: loader,
            name: 'about',
            meta: {
                nav: '关于',
                tmpl: '/pages/about/about.html',
                css: '/pages/about/about.css'
            }
        },
        {
            path: '/404',
            component: loader,
            name: '404',
            meta: {
                tmpl: '/pages/404.html'
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

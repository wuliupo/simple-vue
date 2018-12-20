~function () {
    Vue.config.performance = Vue.config.debug = Vue.config.devtools = Vue.config.productionTip = true;
    Vue.config.silent = false;
    window.SIMPLE_VUE = window.SIMPLE_VUE || {};
    window.SIMPLE_VUE.PAGES = window.SIMPLE_VUE.PAGES || {};
    Vue.prototype.$eventbus = new Vue(); // 用于事件通知
    var router = new VueRouter({
        mode: 'hash',
        routes: window.SIMPLE_VUE.routes
    });
    router.beforeEach(function(to, form, next) {
        if (to.meta && to.meta.nav) {
            document.title = to.meta.nav + ' - Simple Vue demo';
        }
        next();
    });
    window.SIMPLE_VUE.instance = new Vue({
        router: router
    }).$mount('#app');
}();

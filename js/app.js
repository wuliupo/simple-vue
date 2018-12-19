~function () {
    Vue.config.performance = Vue.config.debug = Vue.config.devtools = Vue.config.productionTip = true;
    Vue.config.silent = false;
    window.SIMPLE_VUE = window.SIMPLE_VUE || {};
    window.SIMPLE_VUE.PAGES = window.SIMPLE_VUE.PAGES || {};
    window.SIMPLE_VUE.instance = new Vue({
        router: new VueRouter({
            mode: 'hash',
            routes: window.SIMPLE_VUE.routes
        })
    }).$mount('#app');
}();

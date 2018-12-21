~function () {
    window.SIMPLE_VUE = window.SIMPLE_VUE || {};
    window.SIMPLE_VUE.loader = {
        name: 'page-loader',
        data: function() {
            return {
                name: '',
                component: this.loadPage
            }
        },
        methods: {
            loadPage: function(callback) {
                this.name = this.$route.name;
                var meta = this.$route.meta || {};
                if (!this.name || (!meta.js && !meta.html && !meta.vue)) {
                    this.$router.push({ path: '/' });
                    return;
                }
                var pages = window.SIMPLE_VUE.PAGES;
                if (pages[this.name]) {
                    this.component = pages[this.name];
                    return;
                }

                if (meta.vue) {
                    this.component = pages[this.name] = httpVueLoader(meta.vue);
                    return;
                }

                var that = this;
                new HttpComponentLoader(meta).loadComponent(function(component) {
                    callback && callback(component);
                    return pages[that.name] = that.component = component;
                });
            },
        },
        watch: {
            $route: function() {
                if (this.name !== this.$route.name) {
                    this.loadPage();
                }
            }
        },
        template: '<component :is="component"></component>'
    };
}();

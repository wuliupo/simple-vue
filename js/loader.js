~function () {
    window.SIMPLE_VUE = window.SIMPLE_VUE || {};
    window.SIMPLE_VUE.loader = {
        data: function() {
            return {
                name: '',
                pageJS: '',
                pageTmpl: '',
                component: ''
            }
        },
        methods: {
            loadPage: function() {
                this.name = this.$route.name;
                var meta = this.$route.meta || {};
                if (!this.name || (!meta.js && !meta.tmpl)) {
                    this.$router.push({ path: '/' });
                    return;
                }
                var that = this;
                this.removeResource();
                function callback(rst) {
                    that.pageTmpl = that.pageTmpl || rst && rst.data;
                    var pageJS = (that.pageJS = that.pageJS || window.page);
                    if ((that.pageTmpl || !meta.tmpl) && (pageJS || !meta.js)) {
                        pageJS = pageJS || {}; // only template
                        pageJS.template = that.pageTmpl || pageJS.template || '';
                        data = pageJS.data;
                        if (data && (typeof data !== 'function')) {
                            data = Object.assign({}, data);
                            pageJS.data = function() {
                                return data;
                            };
                        }
                        that.component = pageJS;
                        delete window.page;
                        that.pageTmpl = that.pageJS = '';
                    }
                }
                if (meta.js) {
                    this.loadScript(meta.js, callback);
                }
                if (meta.tmpl) {
                    this.loadText(meta.tmpl, callback);
                }
                if (meta.css) {
                    this.loadStyle(meta.css);
                }
            },
            loadText: function(src, callback, errorback) {
                if (!src) {
                    return;
                }
                axios.get(src).then(callback).catch(errorback);
            },
            loadStyle: function(src, callback, errorback) {
                if (!src) {
                    return;
                }
                var style = document.createElement('link');
                style.rel = 'stylesheet';
                style.id = 'css-' + this.name;
                style.href = src;
                callback && style.addEventListener('load', callback);
                errorback = errorback || function() {
                    console.error('load style error', src);
                };
                style.addEventListener('error', errorback);
                document.head.appendChild(style);
            },
            loadScript: function(src, callback, errorback) {
                if (!src) {
                    return;
                }
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.id = 'js-' + this.name;
                script.src = src;
                callback && script.addEventListener('load', callback);
                errorback = errorback || function() {
                    console.error('load script error', src);
                };
                script.addEventListener('error', errorback);
                document.head.appendChild(script);
            },
            removeResource: function() {
                var style = document.getElementById('css-' + this.name);
                if (style) {
                    document.head.removeChild(style);
                }
                var script = document.getElementById('js-' + this.name);
                if (script) {
                    document.head.removeChild(script);
                }
            }
        },
        watch: {
            $route: function() {
                if (this.name !== this.$route.name) {
                    this.component = '';
                    this.loadPage();
                }
            }
        },
        beforeDestroyed: function() {
            this.removeResource();
        },
        mounted: function() {
            this.loadPage();
        },
        template: '<component v-if="component" :is="component"></component><p v-else>Loading page {{name}}</p>'
    };
}();

~function () {
    window.SIMPLE_VUE = window.SIMPLE_VUE || {};
    window.SIMPLE_VUE.loader = {
        name: 'page-loader',
        data: function() {
            return {
                name: '',
                pageJS: '',
                pageTmpl: '',
                component: this.loadPage
            }
        },
        methods: {
            loadPage: function() {
                this.name = this.$route.name.replace(/[^\w$]/g, '_');
                var meta = this.$route.meta || {};
                if (!this.name || (!meta.js && !meta.tmpl)) {
                    this.$router.push({ path: '/' });
                    return;
                }
                var pages = window.SIMPLE_VUE.PAGES;
                if (pages[this.name]) {
                    this.component = pages[this.name];
                    return;
                }
                var that = this;
                this.removeResource();
                function callback(rst) {
                    that.pageTmpl = that.pageTmpl || rst && rst.data;
                    var pageJS = (that.pageJS = that.pageJS || pages[that.name]);
                    if ((that.pageTmpl || !meta.tmpl) && (pageJS || !meta.js)) {
                        pageJS = pageJS || {}; // only template
                        pageJS.template = that.pageTmpl || pageJS.template || '';
                        pageJS.name = pageJS.name || ('page-' + that.name);
                        data = pageJS.data;
                        if (data && (typeof data !== 'function')) {
                            pageJS.data = (function(d) {
                                d = Object.assign({}, d);
                                return function() {
                                    return d;
                                };
                            })(data);
                        }
                        pages[that.name] = that.component = pageJS;
                        that.removeResource('js-' + that.name);
                        that.pageTmpl = that.pageJS = '';
                    }
                }
                if (meta.js) {
                    this.loadText(meta.js, function(rst) {
                        var content = '~function(){' + rst.data.replace('exports', 'window.SIMPLE_VUE.PAGES.' + that.name) + '}()'
                        that.loadScript('', content);
                        callback();
                    });
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
            loadScript: function(src, content, callback, errorback) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.id = 'js-' + this.name;
                if (src) {
                    script.src = src;
                } else if (content) {
                    try {
                        script.appendChild(document.createTextNode(content));
                    } catch (ex) {
                        script.text = content;
                    }
                } else {
                    throw new Error('loadScript need src or content');
                }
                callback && script.addEventListener('load', callback);
                errorback = errorback || function() {
                    console.error('load script error', src);
                };
                script.addEventListener('error', errorback);
                document.head.appendChild(script);
            },
            removeResource: function(id) {
                if (id) {
                    var dom = document.getElementById(id);
                    if (dom) {
                        document.head.removeChild(dom);
                    }
                } else {
                    this.removeResource('css-' + this.name);
                    this.removeResource('js-' + this.name);
                }
            }
        },
        watch: {
            $route: function() {
                if (this.name !== this.$route.name) {
                    this.loadPage();
                }
            }
        },
        beforeDestroyed: function() {
            this.removeResource();
        },
        template: '<component :is="component"></component>'
    };
}();

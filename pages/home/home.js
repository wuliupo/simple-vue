~function () {
    var page = {
        data: {
            now: ''
        },
        mounted: function() {
            this.now = new Date().toLocaleString();
        }
    };
    var name = document.currentScript.src.replace(/.*\?name=(\w+).*/, '$1');
    window.SIMPLE_VUE.PAGES[name] = page;
}();

~function () {
    window.page = {
        data: {
            now: ''
        },
        mounted: function() {
            this.now = new Date().toLocaleString();
        }
    };
}();

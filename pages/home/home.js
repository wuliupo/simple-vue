exports = {
    data: {
        now: ''
    },
    mounted: function() {
        this.now = new Date().toISOString();
    }
}

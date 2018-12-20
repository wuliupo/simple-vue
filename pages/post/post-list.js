exports = {
    data: {
        items: []
    },
    mounted: function() {
        this.items = [];
        for(var i = 0; i < 10; i++) {
            this.items.push({
                id: 10000 + i,
                title: ('' + Math.random()).replace(/\./, '')
            });
        }
    }
}

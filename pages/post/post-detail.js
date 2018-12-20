exports = {
    data: {
        content: ''
    },
    mounted: function() {
        this.content = '这是编号为：' + this.$route.params.id + '的内容；发布时间是：' + new Date().toISOString();
    }
}

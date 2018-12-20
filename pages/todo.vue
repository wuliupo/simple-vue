<template>
    <section class="real-app">
        <div class="helper">
            <span class="left">{{unFinishedTodoLength}} items left</span>
            <span class="tabs">
                <span v-for="state in states" :key="state" :class="[state, filter === state ? 'actived' : '']" @click="toggleFilter(state)">{{state}}</span>
            </span>
            <span class="clear" @click="clearAllCompleted">Clear Completed</span>
        </div>
        <input type="text" class="add-input" autofocus="autofocus" placeholder="接下去要做什么？" @keyup.enter="addTodo">
        <div v-for="(todo, index) in filteredTodos" :key="index" class="todo-item" :class="{completed : todo.completed}">
            <input type="checkbox" class="toggle" v-model="todo.completed">
            <label>{{todo.content}}</label>
            <button class="destroy" @click="deleteTodo(index)"></button>
        </div>
    </section>
</template>

<script>
module.exports = {
    data() {
        return {
            id: 0,
            todos: [],
            filter: 'all',
            states: ['all', 'active', 'completed']
        };
    },
    computed: {
        unFinishedTodoLength() {
            return this.filterTodos(false).length;
        },
        filteredTodos() {
            if (this.filter === 'all') {
                return this.todos;
            }
            return this.filterTodos(this.filter === 'completed');
        }
    },
    methods: {
        addTodo(e) {
            let content = e.target.value.trim();
            if (content) {
                this.todos.unshift({ id: this.id++, content: content, completed: false });
                e.target.value = '';
            } else {
                alert('内容不能为空！');
            }
        },
        deleteTodo(index) {
            this.todos.splice(index, 1);
        },
        toggleFilter(state) {
            this.filter = state;
        },
        filterTodos(status) {
            return this.todos.filter(todo => todo.completed === status);
        },
        clearAllCompleted() {
            this.todos = this.filterTodos(false) || [];
        }
    }
};
</script>

<style>
.real-app {
    margin: 0 auto;
    width: 600px;
    min-height: auto;
    box-shadow: 0 0 5px #666;
}
.real-app .add-input {
    position: relative;
    margin: 0;
    padding: 16px 16px 16px 60px;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    outline: none;
    color: inherit;
    box-sizing: border-box;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.real-app .todo-item {
    position: relative;
    background-color: #fff;
    font-size: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.real-app .todo-item:hover .destroy:after {
    content: "×";
}
.real-app .todo-item label {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
}
.real-app .todo-item.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
}
.real-app .toggle {
    text-align: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 20px;
    border: none;
    appearance: none;
    outline: none;
    cursor: pointer;
}
.real-app .destroy {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
    background-color: transparent;
    appearance: none;
    border-width: 0;
    cursor: pointer;
    outline: none;
}
.real-app .helper {
    display: flex;
    margin-bottom: 10px;
    padding: 5px 0;
    line-height: 30px;
    font-size: 14px;
    justify-content: space-between;
    border: 1px solid #EEE;
    background-color: #fff;
}
.real-app .left, .real-app .clear, .real-app .tabs {
    padding: 0 10px;
    box-sizing: border-box;
}
.real-app .left, .real-app .clear {
    width: 150px;
}
.real-app .clear {
    text-align: right;
    cursor: pointer;
}
.real-app .tabs {
    width: 200px;
    display: flex;
    justify-content: space-around;
}

.real-app .tabs * {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);
}
.real-app .tabs .actived {
    border-color: rgba(175, 47, 47, 0.4);
    border-radius: 5px;
}
</style>

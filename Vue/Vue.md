# Vue

## 初始化项目

**npm init vue@latest**
这个指令安装并执行了 create-vue

## 模版语法`{{ }}`

使用 JavaScript 表达式
每个绑定仅支持单一表达式，也就是一段能够被求值的 JavaScript 代码
一个简单的判断方法是是否可以合法地写在 return 后面

**v-html**
双大括号将会将数据插值为纯文本，而不是 HTML。若想插入 HTML，你需要使用 v-html 指令

## 属性绑定 v-bind

- v-bind 指令指示 Vue 将元素的 id attribute 与组件的 dynamicld 属性保持一致。
  如果绑定的值是 null 或者 undefined，那么该 attribute 将会从渲染的元素上移除
- 简写："v-bind = "直接改成 :
- 布尔型 Attribute : 依据 true / false 值来决定 attribute 是否应该存在于该元素上，dlisabled 就是最常见的例子之一
- 动态绑定多个值

```vue
<template>
  <div v-bind="objectofAttrs">百战程序员</div>
</template>
<script>
export default {
  data() {
    return {
      objectofAttrs: {
        id: "container",
        class: "wrapper",
      },
    };
  },
};
</script>
```

## 条件渲染 v-if & v-show

- v-if:用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染
- v-else:为 v-if 添加一个 else 区块
- v-else-if:提供的是相应于 v-if 的“else if 区块”。它可以连续多次重复使用
- v-show

**v-if 和 v-show 的区别**
v-if 是“真实的“按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建，
v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。**条件区块只有当条件首次变为 true 时才被渲染**。
相比之下，v-show 简单许多，元素无论初始条件如何，**始终会被渲染，只有 CSS display 属性会被切换**。
总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。
因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适

## 列表渲染 v-for

- 使用 v-for 指令基于一个数组来渲染一个列表。v-for 指令的值需要使用 item in items 形式的特殊语法，
  其中 items 是源数据的数组，而 item 是迭代项的别名.
- v-for 也支持使用可选的第二个参数（index）表示当前项的位置索引

**通过 key 管理状态**
Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。
当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。
为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，
你需要为每个元素对应的块提供一个唯一的 key attribute

```vue
<template>
  <h3>Key属性添加到v-for中</h3>
  <p v-for="(item, index) in names" : key="index">{{ item }}</p>
  <div v-for="item of result" :key="item.id">
    <p>{{ item.title }}</p>
    <img :src="item.avator" alt="" />
  </div>
</template>
```

## 事件监听 v-on

事件处理器的值:

1. 内联事件处理器（很少用）：事件被触发时执行的內联 JavaScript 语句（与 onclick 类似）
2. 方法事件处理器：一个指向组件上定义的方法的属性名或是路径

### 事件参数

**事件参数可以获取 event 对象和通过事件传递数据**
Vue 中的 event 对象就是原生 js 的 event 对象

**传递参数**

```vue
<template>
  <p
    @click="getNameHandle(item, $event)"
    v-for="(item, index) in names"
    :key="index"
  >
    {{ item }}
  </p>
</template>
<script>
export default {
  data() {
    return {
      names: ["iwen", "ime", "frank"],
    };
  },
  methods: {
    getNameHandle(name, e) {
      console.log(name, e);
    },
  },
};
</script>
```

## 数组变化侦测

### 变更方法

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()
  **使用这些方法改变数组，UI 自动更新**

### 替换一个数组

- filter()
- concat()
- slice()
  **返回一个新数组**,需要将旧数组替换为新数组。

## 计算属性 computed

模板中的表达式虽然方便，但也只能用来做简单的操作。如果在模板中写太多逻辑，会让模板变得臃肿，难以维护。
推荐使用计算属性来描述依赖响应式状态的复杂逻辑

**计算属性和方法的区别**
计算属性：**计算属性值会基于其响应式依赖被缓存**。
一个计算属性仅会在其**响应式依赖更新时才重新计算方法**
方法调用总是会在重渲染发生时再次执行函数

## 侦听器 watch

**watch 选项在每次响应式属性发生变化时触发一个函数**

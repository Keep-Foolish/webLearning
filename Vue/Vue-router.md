# Vue-router

## 初始化

**1. 编写路由规则**
_path 什么都不写就是默认路由_
**2. main.js 注册**
**3. router-view 路由出口**
router-view 可以写在任何位置
**4. router-link**
类似 a 标签，跳转到指定标签

## 路由模式 hash & history

### hash

hash 是 URL 中 hash（#）及后面的那部分，常用作锚点在页面内进行导航，**改变 URL 中的 hash 部分不会引起页面刷新**

通过 hashchange 事件监听 URL 的变化，改变 URL 的方式只有这几种：

1. 通过浏览器前进后退改变 URL
2. 通过<a> 标签改变 URL
3. 通过 window.location 改变 URL

### history

history 提供了 pushState 和 replaceState 两个方法，**这两个方法改变 URL 的 path 部分不会引起页面刷新**

history 提供类似 hashchange 事件的 popstate 事件，但 popstate 事件有些不同：

1. 通过浏览器前进后退改变 URL 时会触发 popstate 事件
2. 通过 pushState/replaceState 或 <a> 标签以变 URL 不会触发 popstate 事件。
3. 好在我们可以拦截 pushState/replaceState 的调用和<a>标签的点击事件来检测 URL 变化
4. 通过 js 调用 history 的 back，go, forward 方法课触发该事件
   所以监听 URL 变化可以实现，只是没有 hashchange 那么方便。

## 命名路由

- 给路由规则 name 属性
- router-link 中 to 属性写成:to="{name:\_\_\_}"

**使用 a 标签会刷新页面，router-link 不会**

## 编程式导航

**绑定函数实现跳转**

```vue
<template>
  <button @click="toPage('Reg')">Reg</button>
  <button @click="toPage('Login')">Reg</button>
  < div>
    <hr />
    <router-view></router-view>
  </>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const toPage = (url) => {
  //字符串
  //对象
  //命名式
  router.push({
    name: url,
  });
};
</script>
```

## 历史记录

### 不保留历史记录

router-link**加上 replace 属性，不会保留历史记录**

编程式导航中 router.push()改成 router.replace()

### 前进、后退

在编程式导航中:

- 前进: router.go()
- 后退: router.back()

## 路由传参 query & params

### query

**query 只能接受一个对象作为参数**

### params

- 只能用路由规则的 name 属性，不能用 path
- params 参数是存在内存中的，刷新会丢失

### 动态路由参数

格式:**/:**

- 在写路由游规则的时候路径后面就写好参数

```js
const routes = [
  {
    path: "/Reg/:id",
    name: "Reg",
    component: () => import("../components/reg.vue"),
  },
];
```

- 在跳转的时候给参数传递值

```js
router.push({
  name: "Reg",
  params: {
    id: item.id,
  },
});
```

## 嵌套路由 children

注意：**跳转时要加上父路由的前缀**

```js
const routes = [
  {
    path: "/",
    component: () => import("../components/footer vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../components/login.vue"),
      },
      {
        path: "reg",
        name: "Reg",
        component: () => import("../components/reg.vue"),
      },
    ],
  },
];
```

## 命名视图 <router-view name="aaa"></router-view>

给 router-view 定义名称
**组件属性写成对象形式，router-view 的视图根据 name 属性匹配对象的键来展示**

```js
const routes = [
  {
    path: "/",
    component: () => import("../components/root. vue"),
    children: [
      {
        path: "/user1",
        components: {
          default: () => import("../components/A.vue"),
        },
      },
      {
        path: "/user2",
        components: {
          bbb: () => import("../components/B.vue"),
          ccc: () => import("../components/C.vue"),
        },
      },
    ],
  },
];
```

```vue
<template>
  <div>
    <router-link to="/user1">/user1</router-link>
    <router-link style="margin-left:30px" to="/user2">/user2</router-link>
    <hr />
    <router-view></router-view>
    <router-view name="bbb"></router-view>
    <router-view name="ccc"></router-view>
  </div>
</template>
```

## 路由重定向 redirect

在路由规则中加入 redirect 属性，实现路由重定向
**三种书写形式**

- 直接路径传字符串

```js
redirect: "/login";
```

- 传对象

```js
redirect: {
  path: "/login";
}
```

- 回调函数

```js
redirect: (to) => {
  return {
    path: "/user1",
    query: {
      name: "zw",
    },
  };
};
```

## 别名 alias

**给路由取多个名字**
在路由规则中加入 alias 属性，参数类型是数组

## 导航守卫 router.beforeEach() & router.afterEach()

### 全局前置守卫 router.beforeEach()

**中间键,所有的跳转、前进、后退，都会经过这个函数**
不写 next 就不会跳转

```js
router.beforeEach((to, from, next) => {
  if (whilelist.includes(to.path) || localStorage.getItem("token")) {
    next();
  } else {
    next("/");
  }
});
```

### 全局后置守卫 router.afterEach()

```js
router.afterEach((to, from) => {});
```

**导航守卫实例**
在页面切换前用 router.beforeEach()启动加载动画
在页面切换成功后用 router.afterEach()关闭加载动画

## 路由元信息 meta

通过路由记录的 meta 属性可以定义路由的元信息。使用路由元信息可以在路由中附加自定义的数据，例如:

- 权限校验标识。
- 路由组件的过渡名称。
- 路由组件持久化缓存（Keep-alive）的相关配置。
- 标题名称
  我们可以在**导航守卫**或者是**路由对象**中访问路由的元信息数据。

**设置数据**

```js
const router = createRouter({
  history: createebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Login.vue"),
      meta: {
        title: "登录页面",
      },
    },

    {
      path: "/index",
      component: () => import("@/views/Index.vue"),
      meta: {
        title: "首页！！！",
      },
    },
  ],
});
```

**获得数据**
只要和路由相关，都可以读到

```js
router.afterEach((to, from) => {
  title = to.meta.title;
});
```

## 路由过度动效 transition

- 可以使用 v-solt 插槽 API
  这会对所有路由使用相同的动效

```js
const router = createRouter({
  history: createebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Login.vue"),
      meta: {
        title: "登录页面",
        transition: "animate_fadeIn",
      },
    },

    {
      path: "/index",
      component: () => import("@/views/Index.vue"),
      meta: {
        title: "首页！！！",
        transition: "animate_bounceIn",
      },
    },
  ],
});
```

**使用**

```vue
<template>
  <router-view #default="{ route, Component }">
    <transition
      :enter-active-class="`animate__animated ${route.meta.transition}`"
    >
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import "animate.css";
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
</style>
```

## 滚动行为 scorllBehavior()

滚动后返回，可以回到原来滚动的位置

```js
const router = createRouter({
  scrollBehavior: (to, from, savePosition) => {
    if (savePosition) {
      return savePosition;
    } else {
      return {
        top: 0,
      };
    }
  },
});
```

## 动态路由 addroute()

```js
router.addRoute({ path: "/about", component: About });
```

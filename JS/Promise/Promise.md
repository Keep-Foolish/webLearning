# Promise

&nbsp;

## 初始化

- 是一个构造函数
- JS 中用于异步问题的新解决方案，旧方案是回调函数
  &nbsp;

## 异步编程

- fs 文件操作
- 数据库操作
- AJAX
- 定时器
  &nbsp;

## Promise 的优势

### 链式调用

- 解决了回调地狱问题

### 指定回调函数的方式更灵活

- promise： 启动异步任务 => 返回 promise 对象 => 给 promise 对象绑定回调函数（甚至可以在异步任务结束后指定/多个）
  &nbsp;

## Promise 的状态

实例对象中的一个属性 「PrmosieState」

- pending 未决定的
- resolved / fullfilled 成功
- rejected 失败

### 状态的改变

1. pending 变为 resolved
2. pending 变为 rejected
   说明：
   只有这两种,且**一个 promise 对象只能改变一次**
   无论变为成功还是失败，都会有一个结果数据
   成功的结果数据一般称为 value，失败的结果数据一般称为 reason
   &nbsp;

## Promise 对象的值

实例对象中的另一个属性 「PromiseResult」
保存着异步任务「成功/失败」的结果
只有 resolve 和 reject 可以修改这个值
&nbsp;

## Promise 的基本流程

![image-20231227163159056](/Users/zhangwei/Library/Application Support/typora-user-images/image-20231227163159056.png)
&nbsp;

## Promise API

&nbsp;

## Promise 的关键问题

### 1.如何改变 promise 的状态？

1. resolve(value) pending => resolved / fullfilled
2. reject(reason) pending => rejected
3. **抛出异常**： pending => rejected

```js
let p = new Promise((resolve, reject) => {
  throw "出问题了";
});
```

此时 p 的状态为 rejected

### 2.一个 Promise 指定多个成功/失败回调函数，都会吊用吗？

**当 Promise 改变为对应状态时都会调用**

```js
let p = new Promise((resolve, reject) => {
  resolve("OK");
});

p.then((value) => {
  console.log(value);
}).then((value) => {
  console.log(value);
});
```

两个 then 回调都会执行

### 3.改变 promise 状态和指定回调函数谁先谁后？

1. 都有可能，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调
2. 如何先改状态再指定回调？

- 在执行器中直接调用 resolve() / reject()
- 延迟更长的时间调用 then()

3. 什么时候才能得到数据？
   **_如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据_**（**指定不是执行**） \*如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

```js
//先指定回调
let p = new Promise((resolve, reject) => {
  //resolve是一个异步任务的时候 then方法先执行
  setTimeout(() => {
    resolve("OK");
  }, 1000);
});

p.then(
  (value) => {
    console.log(value);
  },
  (reason) => {}
);
```

### 4.promise.then()返回的新 promise 的结果状态由什么来决定？

**then 方法返回的是一个 promise 对象**

1. 简单表达：由 then()指定的回调函数执行的结果决定
2. 详细表达：

- 如果抛出异常：新 promise 对象状态变成 rejected，reason 为抛出的异常
- 如果返回的是是非 promise 的任意值，新 promise 对象状态变成 fulfilled，value 为返回的值
- 如果返回的是另一个新的 promise 对象，此 promise 的结果就会称为新 promise 的结果

```js
let p = new Promise((resolve, reject) => {
  resolve("OK");
});

const result = p.then(
  (value) => {
    //1.抛出错误
    //   throw "出问题了"   此时 result State 是 rejected Result 是“出了问题”
    //2. 返回结果不是promise对象
    // return 521;  此时 result State 是 fulfilled Result 是521
    //3. 返回的结果是一个promise对象
    // return 的 promise 的结果就是 then 方法返回的结果
  },
  (reason) => {
    console.log(reason);
  }
);

console.log(result);
```

### Promise 如何串联多个操作任务？

- promise 的 then()返回一个新的 promise 对象，可以写成 then()方法的链式调用
- 通过 then()的链式调用串联多个同步/异步任务

```js
let p = new Promise((resolve, reject) => {
  resolve("OK");
});

p.then((value) => {
  return new Promise((resolve, reject) => {
    resolve("success");
  });
})
  .then((value) => {
    console.log(value); //success
  })
  .then((value) => {
    //上一个then的返回值没有写
    console.log(value); //undefined
  });
```

### Promise的异常穿透
- 当使用promise的then链式调用时, 可以在最后指定失败的回调,
- **前面任何操作出了异常, 都会传到最后失败的回调中处理**

~~~js
new Promise((resolve, reject) => {
    console.log(111);
    reject('error');
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(value);
}).then(value => {
    console.log(value)
}).catch(reason => {
    console.log(reason);
})
~~~

### 中断Promise链

## then方法回调的异步执行
**then中的回调是异步执行的**
```js
let p1 = new Promise((resolve,reject) => {
  resolve('ok')
  console.log(111)
})

p1.then(value => {
  console.log(222)
})

console.log(333)
// 打印顺序是111 333 222
```
&nbsp;

## async与await

### async函数
1.函数的返回值为Promise对象
2.Promise对象的返回值由async函数执行的返回值决定
*如果返回值是一个非Promise类型的数据，结果就是一个成功的Promise对象，return什么PromiseResult就是什么
*如果返回的是一个Promise对象/抛出异常 结果和return的结果一样

### await表达式
1.await 是一个修饰符，只能放在async定义的函数内。可以理解为**等待**。
2.await 右侧的表达式一般为Promise对象，但也可以是其他值
*如果是Promise对象，可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；
*如果不是Promise对象：把这个非promise的东西当做await表达式的结果。

注意事项：
- await必须写在async函数中，但是async函数中可以没有await
- 如果await的promise失败了，就会抛出异常，需要通过try...catch捕获处理

&nbsp;

## util.promisify

返回一个 promise
将回调函数风格的方法转变成 promise 风格的函数

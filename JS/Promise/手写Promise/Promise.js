class Promise {
  //构造函数
  constructor(executor) {
    // 添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    //声明属性
    //处理promise内部是异步的情况
    //数组保存回调，then可以链式调用
    this.callbacks = [];
    //保存实例对象的 this 的值
    const self = this;

    //reslove函数
    function resolve(data) {
      //判断状态是否被改过(状态只能被修改一次)
      if (self.PromiseState !== "pending") return;
      //1.修改对象的状态（PromiseState）
      self.PromiseState = "fulfilled";
      //2.设置对象结果值（PromiseResult）
      self.PromiseResult = data;
      //调用成功的回调函数
      setTimeout(() => {
        self.callbacks.forEach((item) => {
          item.onResolved(data);
        });
      });
    }

    //reject函数
    function reject(data) {
      if (self.PromiseState !== "pending") return;
      //1.修改对象的状态（PromiseState）
      self.PromiseState = "rejected";
      //2.设置对象结果值（PromiseResult）
      self.PromiseResult = data;
      //调用失败的回调函数
      setTimeout(() => {
        self.callbacks.forEach((item) => {
          item.onRejected(data);
        });
      });
    }

    //try catch是为了抛出错误的时候 执行reject
    try {
      //同步调用执行器函数
      executor(resolve, reject);
    } catch (err) {
      //修改 promise 对象的状态为失败
      reject(err);
    }
  }

  // then 方法封装
  then(onResolved, onRejected) {
    const self = this;
    //判断回调函数参数
    if (typeof onRejected !== "function") {
      //处理异常穿透 从第一个发现异常的开始，将异常传递给下一个 then 方法
      onRejected = (reason) => {
        throw reason;
      };
    }
    //值传递 没有指定参数，加一个值传递
    if (typeof onResolved !== "function") {
      onResolved = (value) => value;
    }
    return new Promise((resolve, reject) => {
      //封装函数
      function callback(type) {
        try {
          //获取回调函数的执行结果
          let result = type(self.PromiseResult);
          //判断
          if (result instanceof Promise) {
            //如果是promise类型的对象
            result.then(
              (value) => {
                //你成功的结果就是我成功的结果
                resolve(value);
              },
              (reason) => {
                reject(reason);
              }
            );
          } else {
            //结果的对象状态为成功
            resolve(result);
          }
        } catch (err) {
          //如果抛出异常，我返回的promise结果也是失败的
          reject(err);
        }
      }
      //调用回调函数 PromiseState
      if (this.PromiseState === "fulfilled") {
        setTimeout(() => {
          callback(onResolved);
        });
      }
      if (this.PromiseState === "rejected") {
        setTimeout(() => {
          callback(onRejected);
        });
      }
      //处理异步 先执行then函数
      if (this.PromiseState === "pending") {
        //保存回调函数
        //用数组保存确保可以链式调用 不会导致覆盖问题
        this.callbacks.push({
          onResolved: function () {
            //异步任务 then 返回结果
            //执行成功的回调函数
            callback(onResolved);
          },
          onRejected: function () {
            callback(onRejected);
          },
        });
      }
    });
  }

  // catch 方法封装
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  //添加 resolve 方法
  static resolve(value) {
    //返回 Promise 对象
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else {
        // 状态设置为成功
        resolve(value);
      }
    });
  }

  //添加 reject 方法
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
  
  //添加 all 方法
  static all(Promises) {
    //返回结果是一个Promise对象
    return new Promise((resolve, reject) => {
      let count = 0;
      let arr = [];
      //遍历
      for (let i = 0; i < Promises.length; i++) {
        //
        Promises[i].then(
          (value) => {
            //得知对象的状态是成功的
            //每个Promise对象都成功 才能执行resolve
            count++;
            //将当前Promise对象的结果存入数组
            //push的话 异步执行后会导致PromiseResult的顺序和传入的数组顺序不一致
            arr[i] = value;
            if (count === Promises.length) {
              //修改状态
              resolve(arr);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }

  //添加 race 方法
  static race(Promises) {
    return new Promise((resolve, reject) => {
      for (let i = 1; i < Promises.length; i++) {
        Promises[i].then(
          (value) => {
            // 修改返回结果的状态为成功
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
}

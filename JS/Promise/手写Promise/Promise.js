//声明构造函数
function Promise(executor) {
  // 添加属性
  this.PromiseState = "pending";
  this.PromiseResult = null;
  //声明属性
  //处理promise内部是异步的情况
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
    self.callbacks.forEach((item) => {
      item.onResolved(data);
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
    self.callbacks.forEach((item) => {
      item.onRejected(data);
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

//添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  return new Promise((resolve, reject) => {
    //调用回调函数 PromiseState
    if (this.PromiseState === "fulfilled") {
      try {
        //获取回调函数的执行结果
        let result = onResolved(this.PromiseResult);
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
    if (this.PromiseState === "rejected") {
      onRejected(this.PromiseResult);
    }
    //处理异步 先执行then函数
    if (this.PromiseState === "pending") {
      //保存回调函数
      //用数组保存确保可以链式调用 不会导致覆盖问题
      this.callbacks.push({
        onResolved: function () {
          //异步任务 then 返回结果
          //执行成功的回调函数
          try {
            let result = onResolved(self.PromiseResult);
            if (result instanceof Promise) {
              result.then(
                (value) => {
                  resolve(value);
                },
                (reason) => {
                  reject(reason);
                }
              );
            } else {
              resolve(result);
            }
          } catch (err) {
            reject(err);
          }
        },
        onRejected: function () {
          try {
            let result = onRejected(self.PromiseResult);
            if (result instanceof Promise) {
              result.then(
                (value) => {
                  resolve(value);
                },
                (reason) => {
                  reject(reason);
                }
              );
            } else {
              resolve(result);
            }
          } catch (err) {
            reject(errr);
          }
        },
      });
    }
  });
};

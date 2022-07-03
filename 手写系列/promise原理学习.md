### Promise 核心实现

#### promise实现异步逻辑的核心

```js
// 先定义三个常量表示状态
  const PENDING = 'pending';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';

  // 新建 MyPromise 类
  class MyPromise {
    constructor(executor) {
      // executor 是一个执行器，进入会立即执行
      // 并传入resolve和reject方法
      executor(this.resolve, this.reject);
      // 储存状态的变量，初始值是 pending
      this.status = PENDING;
      // 成功之后的值
      this.value = null;
      // 失败之后的原因
      this.reason = null;
      // 存储成功回调函数
      this.onFulfilledCallback = null;
      // 存储失败回调函数
      this.onRejectedCallback = null;
    }

    // 更改成功后的状态
    resolve = (value) => {
      // 只有状态是等待，才执行状态修改
      if (this.status === PENDING) {
        // 状态修改为成功
        this.status = FULFILLED;
        // 保存成功之后的值
        this.value = value;
        //判断成功回调是否存在，如果存在则调用
        this.onFulfilledCallback && this.onFulfilledCallback(value)

      }
    }

    // 更改失败后的状态
    reject = (reason) => {
      // 只有状态是等待，才执行状态修改
      if (this.status === PENDING) {
        // 状态成功为失败
        this.status = REJECTED;
        // 保存失败后的原因
        this.reason = reason;
        //判断失败回调是否存在，如果存在则调用
        this.onRejectedCallback && this.onRejectedCallback(reason)

      }
    }

    then(onFulfilled, onRejected) {
      // 判断状态
      if (this.status === FULFILLED) {
        // 调用成功回调，并且把值返回
        onFulfilled(this.value);
      } else if (this.status === REJECTED) {
        // 调用失败回调，并且把原因返回
        onRejected(this.reason);
      }else if(this.status === PENDING){
        //存储成功及失败回调
        this.onFulfilledCallback = onFulfilled;
        this.onRejectedCallback = onRejected;
      }
    }
  }
  const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 2000);
  })

  promise.then(value => {
    console.log("1")
    console.log('resolve', value)
  }, reason => {
    console.log('reject', reason)
  })
```

### promise的then方法多次调用添加多个函数

```js
  // 先定义三个常量表示状态
  const PENDING = 'pending';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';

  // 新建 MyPromise 类
  class MyPromise {
    constructor(executor) {
      // executor 是一个执行器，进入会立即执行
      // 并传入resolve和reject方法
      executor(this.resolve, this.reject);
      // 储存状态的变量，初始值是 pending
      this.status = PENDING;
      // 成功之后的值
      this.value = null;
      // 失败之后的原因
      this.reason = null;
      /* 代码修改处*/
      // 存储成功回调函数
      this.onFulfilledCallback = [];
      // 存储失败回调函数
      this.onRejectedCallback = [];
    }

    // 更改成功后的状态
    resolve = (value) => {
      // 只有状态是等待，才执行状态修改
      if (this.status === PENDING) {
        // 状态修改为成功
        this.status = FULFILLED;
        // 保存成功之后的值
        this.value = value;
         /* 代码修改处*/
        //resolve里面所有的成功的回调拿出来执行
        while (this.onFulfilledCallback.length) {
          //取出第一个元素，然后（）调用
          this.onFulfilledCallback.shift()(value)
        }

      }
    }

    // 更改失败后的状态
    reject = (reason) => {
      // 只有状态是等待，才执行状态修改
      if (this.status === PENDING) {
        // 状态成功为失败
        this.status = REJECTED;
        // 保存失败后的原因
        this.reason = reason;
         /* 代码修改处*/
        //resolve里面所有的成功的回调拿出来执行
        while (this.onRejectedCallback.length) {
          //取出第一个元素，然后（）调用
          this.onRejectedCallback.shift()(reason)
        }

      }
    }

    then(onFulfilled, onRejected) {
      // 判断状态
      if (this.status === FULFILLED) {
        // 调用成功回调，并且把值返回
        onFulfilled(this.value);
      } else if (this.status === REJECTED) {
        // 调用失败回调，并且把原因返回
        onRejected(this.reason);
      } else if (this.status === PENDING) {
         /* 代码修改处*/
        //存储成功及失败回调
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      }
    }
  }
  const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 2000);
  })

  promise.then(value => {
    console.log("1")
    console.log('resolve', value)
  }, reason => {
    console.log('reject', reason)
  })
  promise.then(value => {
    console.log("2")
    console.log('resolve', value)
  }, reason => {
    console.log('reject', reason)
  })
```




## 一、手写call

```js
  //手写call
  var name = '一尾流莺'
  var obj = {
    name: 'warbler',
  }
  function foo(text) {
    console.dir(this.name);
    return text || 'success'
  }
  Function.prototype.myCall = function(context = window, ...args){
    if(this === Function.prototype){
      throw new TypeError('Error') //用于防止Function.prototype.myCall()直接被调用
    }
    //首先判断上下文的类型， 如果是undefined或者是null类型，则指向window(默认指向window)
    //否则使用Object()将上下文包装成对象
    context = context || window;
    //创建一个symbol（保证唯一性不会重名）属性，将当前函数赋值给这个属性
    //symbol属性请看：https://www.cnblogs.com/Renyi-Fan/p/12585049.html#_label0_1
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    // console.log("symnol", fn, context[fn], result)
    delete context[fn];
    return result;
  }
  foo.myCall(null, "爱你")
  foo.myCall(obj, "不爱你")
  console.log(foo.myCall(obj, "不爱你"))
```

## 二、手写apply

```js
  //手写apply
  var name = '一尾流莺'
  var obj = {
    name: 'warbler',
  }
  function foo(...text) {
    console.log(this.name, text);
    return 'success'
  }
  Function.prototype.myApply = function (context = window, args) {
    if (this === Function.prototype) {
      throw new TypeError('Error')
    }
    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    let result;
    if(Array.isArray(args)){ //判断是否是数组
      result = context[fn](...args)
    }else{
      result = context[fn]()
    }
    delete context[fn];
    return result;
  }
  foo.myApply(obj, [10,10])
```

## 三、手写bind

```js
  //手写bind
  /*
  * 处理参数，返回一个闭包
  * 判断是否为一个构造函数调用， 如果是则使用new调用当前函数
  * 如果不是，使用apply，将context和处理好的参数传入
  */

  var name = '一尾流莺'
  var obj = {
    name: 'warbler',
  }
  function foo(...text) {
    console.log(this.name, text);
    return 'success'
  }
  Function.prototype.myBind = function (context = window, ...args1) {
    if (this === Function.prototype) {
      throw new TypeError('Error')
    }
    const that = this;
    return function F(...args2) {
      if (this instanceof F) {
        return new that(...args1, ...args2)
      }
      return that.apply(context, args1.concat(args2))
    }
  }
  const x = foo.myBind(obj);
  x(20,10,30)
```




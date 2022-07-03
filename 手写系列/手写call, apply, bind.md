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
      return undefined //用于防止Function.prototype.myCall()直接被调用
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


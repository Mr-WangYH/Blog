<!--
 * @Descripttion:
 * @version:
 * @Author: 阿鸿
 * @Date: 2022-07-18 17:16:26
 * @LastEditors: 阿鸿
 * @LastEditTime: 2022-08-12 18:34:20
-->

# promise

## 什么是 promise

Promise 是 ES6 的新特性，是异步编程的一种解决方案，从语法上说，Promise 是一个对象，从它可以获取异步操作的消息，可以解决回调地狱(回调地狱嵌套回调函数)；

Promise 的含义：

本身不是异步，是封装异步操作容器，统一异步的标准；

Promise 对象的特点：

对象的状态不受外界影响，一旦状态改变，就不会再变，任何时候都可以得到这个结果；Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。

### 传统的异步操作

```js
<script src="node_modules/jquery/dist/jquery.js"></script>
<script>
  $.ajax({
  url: 'xxx',
  success: function(res) {
    console.log(res)
    $.ajax({
      url: 'xxx' + res.id,
      success: function(res2) {
        console.log(res2)
      }
    })
  }
})
</script>
```

如果下一个异步依赖上一个异步，需要在上一个异步的回调中去处理下一次的异步，这样的代码会造成嵌套（回调地狱）的问题,会难以阅读和维护。

### 利用 Promise 处理异步

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。

```js
const promiseGetBooks = new Promise(function (resolve, reject) {
  // 回调函数内部进行异步处理
  $.ajax({
    url: 'xxx',
    success: function (res) {
      resolve(res);
    },
    error: function (err) {
      reject(err);
    },
  });
});

promiseGetBooks
  .then((res) => {
    console.log(res);
    return new Promise(function (resolve, reject) {
      // 回调函数内部进行异步处理
      $.ajax({
        url: 'xxx',
        success: function (res) {
          resolve(res);
        },
      });
    });
  })
  .then((res) => {
    console.log(res);
    return new Promise(function (resolve, reject) {
      // 回调函数内部进行异步处理
      $.ajax({
        url: 'xxx',
        success: function (res) {
          resolve(res);
        },
      });
    });
  })
  .then((res) => {
    console.log(res);
  });
```

### Promise 的优缺点及状态

- 优点

  1. 将异步操作以同步操作的方式表达出来，避免层层嵌套回调函数
  2. 提供统一的操作接口，方便对异步操作的控制

- 缺点

  1. promise 一旦建立，则不可取消
  2. 如果不设置回调函数，则会在 promise 内部抛出错误，不会反应到外部
  3. 当状态是 pending 是，无法判断当前状态（是异步刚刚开始执行还是即将完成了异步操作）

- 状态
  1. Pending 等待态：可以变更为执行态或拒绝态
  2. Fulfilled 执行态：不能再去改变状态，必须包含一个最终值（value）
  3. Rejected 不能再去改变状态，必须包含一个拒绝的原因（reason）

### 静态方法-all

Promise.all()参数可以传递一个数组，数组中记录所有的 promise 异步处理

返回值是一个 Promise 的实例对象 then 方法可以获取到所有的 promise 异步处理的结果，一旦有某一个调用执行了 reject，则终止进入 catch

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 0);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 0);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 0);
});

Promise.all([p1, p2, p3]).then((res) => {
  console.log(res); //[1,2,3]
});
```

### 静态方法-allSettled

Promise.all 和 allSettled 基本一样，区别是，then 始终可以获取到异步的状态，哪怕其中有一个失败

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 0);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 0);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 0);
});

Promise.allSettled([p1, p2, p3]).then((res) => {
  console.log(res);
  //[{status: 'fulfilled', value: 1},{status: 'rejected', reason: 2},{status: 'fulfilled', value: 3}]
});
```

### 静态方法-race

Promise.race 使用和 all 一样，但是只返回第一个结果，不管成功或失败

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1);
  }, 500);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 200);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 300);
});

Promise.race([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err); // 2
  });
```

### 静态方法-any

Promise.any 返回第一个成功的结果

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1);
  }, 500);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 200);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 300);
});

Promise.race([p1, p2, p3]).then((res) => {
  console.log(res); // 3
});
```

### promise A+规范

[原文](https://promisesaplus.com/#notes) [译文](https://zhuanlan.zhihu.com/p/143204897)

### Promise 源码解析

```js
/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/

// 定义三个状态
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
function resolvePromise(x, promise2, resolve, reject) {
  //判断x === promise, 抛出类型错误
  if (x === promise2) {
    console.log('======');
    return reject(new TypeError('类型错误'));
  }
  // 允许状态改变一次
  let called = false;

  try {
    //判断x是否包含then属性，thenable
    if (typeof x === 'object' && x !== null) {
      const then = x.then;
      if (typeof then === 'function') {
        // console.log(typeof then)
        x.then(
          x,
          (v) => {
            if (called) return;
            called = true;
            resolvePromise(v, promise2, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } else {
      if (called) return;
      called = true;
      resolve(x);
    }
  } catch (e) {
    if (called) return;
    called = true;
    reject(e);
  }
}
class Promise {
  constructor(exectuor) {
    try {
      //捕获执行器错误
      exectuor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  status = PENDING;
  value = null;
  reason = null;
  //存储失败和成功的回调
  onFullFilledCallbacks = [];
  onRejectedCallbacks = [];

  static all(args) {
    return new Promise((resolve, reject) => {
      args.reduce((prev, curr, i, arr) => {
        if (curr instanceof Promise) {
          curr.then(
            (v) => {
              prev[i] = v;
              if (prev.length === arr.length) {
                resolve(prev);
              }
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          prev[i] = curr;
        }
        return prev;
      }, []);
    });
  }
  static resolve(v) {
    if (v instanceof Promise) return v;
    return new Promise((resolve, reject) => resolve(v));
  }
  static reject(r) {
    return new Promise((resolve, reject) => {
      reject(r);
    });
  }
  static allSettled(args) {
    return new Promise((resolve, reject) => {
      function addData(prev, index, value) {
        prev[index] = value;
        if (prev.length === args.length) {
          resolve(prev);
        }
      }
      args.reduce((prev, curr, index, arr) => {
        if (curr instanceof Promise) {
          curr.then(
            (res) => {
              addData(prev, index, {
                value: res,
                status: 'fulfilled',
              });
            },
            (r) => {
              addData(prev, index, {
                reason: r,
                status: 'rejected',
              });
            }
          );
        } else {
          addData(prev, index, {
            reason: curr,
            status: 'fulfilled',
          });
        }
      });
    });
  }

  static race(args) {
    return new Promise((resolve, reject) => {
      args.forEach((item) => {
        if (item instanceof Promise) {
          item.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          resolve(item);
        }
      });
    });
  }

  finally(cb) {
    return this.then(
      (v) => {
        return Promise.resolve(cb()).then(() => v);
      },
      (r) => {
        return Promise.resolve(cb()).then(() => {
          throw r;
        });
      }
    );
  }

  resolve = (v) => {
    //只有状态为pending才执行
    if (this.status === PENDING) {
      this.status = RESOLVED;
      this.value = v;
      this.onFullFilledCallbacks.forEach((c) => c());
    }
  };

  reject = (r) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = r;
      this.onRejectedCallbacks.forEach((c) => c());
    }
  };

  then(onFullFilled, onRejected) {
    debugger;
    //onFullFilled onRejected类型判断
    if (typeof onFullFilled !== 'function') onFullFilled = (v) => v;
    if (typeof onFullFilled !== 'function') {
      onRejected = (r) => {
        throw r;
      };
    }
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        // Promise为微任务，所以放到微任务队列执行
        queueMicrotask(() => {
          try {
            const x = onFullFilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.status === PENDING) {
        //如果状态为pending，则执行方法放入数组中，等待resolve或reject时候执行
        this.onFullFilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFullFilled(this.value);
              resolvePromise(x, promise2, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
}

Promise.deferred = function () {
  var result = {};
  result.promise = new Promise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = Promise;
```

### 总结

1. new Promise 的时候并且传递了回调参数

- Promise 类初始化，初始化了 promise 状态、记录成功失败的返回值、记录成功和失败的回调函数
- 此时开始执行 exectuor，源码中判断 exectuor 是否是函数，是，立即调用了 exectuor，不是直接 reject，并且把传递了 resolve 函数和 reject 函数
- 此时证明了 promise 的回调参数（函数）是同步的

2. then 函数

- 默认返回 promise，保证可以链式调用
- then 的回调执行是异步的，不管 Promise 的回调中是否开启了异步，在 then 中 onFullFilled，和 onRejected 都是通过 queueMicrotask 创建一个微任务队列去执行的，所以 then 的回调都是异步的
- 并且在 then 函数中进行了状态的判断，所以 promise 的状态只能从 pending => fulfilled 或 pending => rejected，并且状态是不可逆的

  1. 如果状态是 RESOLVED 通过创建 queueMicrotask 创建一个微任务队列去执行，如果进入 then 中状态变成了 RESOLVED 是因为是 promise 中直接调用了 resolve()
  2. 如果状态是 REJECTED 通过创建 queueMicrotask 创建一个微任务队列去执行，如果进入 then 中状态变成了 RESOLVED 是因为是 promise 中直接调用了 reject()
  3. 如果状态是 pending，能够进入 pending 实际上是因为 Promise 中进行了异步的处理，异步结果是不确定，所以将 onFullFilled/onRejected 通过创建微任务队列存放到 onFullFilledCallbacks 和 onRejectedCallbacks 数组中（因为有可能 promise 实例多次执行 then），等异步完成调用 resolve 或者 reject 在数组中依次循环取出执行

3.  考虑 then 中手动返回 promise

    有一个 resolvePromise 方法，这个方法会得到 onFullFilled(then 的成功回调)返回值，在该方法内部判断返回值是否为 promise

- 如果不是 promise 调用 resolve（备注：then 默认返回的 promise），将值传递到下一个 then 中
- 如果是 promise 有可能 promise 中调用 resolve 继续返回 promise 所以，继续递归调用 resolvePromise，一直到 x 不是 promise，就再次走上一条了
- 所以不管我们在 then 的成功回调用有没有返回 promise，实际上下一个 then 都是由上一个 then 默认返回的 promise 中的 resolve 返回的结果

## generator 函数

Generator 函数是 ES6 提供的一种异步编程解决方案，作用是函数执行时可以进行暂停

- **形式上：** Generator 函数是一个普通的函数，不过相对于普通函数多出了两个特征。一是在 function 关键字和函数明之间多了’\*'号；二是函数内部使用了 yield 表达式，用于定义 Generator 函数中的每个状态。
- **语法上：** Generator 函数封装了多个内部状态(通过 yield 表达式定义内部状态)。执行 Generator 函数时会返回一个遍历器对象(Iterator(迭代器)对象)。也就是说，Generator 是遍历器对象生成函数，函数内部封装了多个状态。通过返回的 Iterator 对象，可以依次遍历(调用 next 方法)Generator 函数的每个内部状态。
- **调用上：** 普通函数在调用之后会立即执行，而 Generator 函数调用之后不会立即执行，而是会返回遍历器对象(Iterator 对象)。通过 Iterator 对象的 next 方法来遍历内部 yield 表达式定义的每一个状态。

### generator 函数的使用

```js
function* myGenerator() {
  yield 'Hello';
  yield 'world';
  return 'ending';
}

let MG = myGenerator();

MG.next(); // {value:'Hello',done:false}   value是yield后面的值
MG.next(); // {value:'world',done:false}
MG.next(); // {value:'ending',done:true}
MG.next(); // {value:'undefined',done:false}
```

遍历器对象的 next 方法的运行逻辑如下：

- 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。
- 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。
- 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值。
- 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined。

需要注意的是，yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行 \*

### next 方法的参数

yield 表达式本身没有返回值，或者说总是返回 undefined。next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。

```js
function* foo(x) {
  var y = 2 * (yield x + 1);
  var z = yield y / 3;
  return x + y + z;
}

var a = foo(5);
a.next(); // Object{value:6, done:false}
a.next(); // Object{value:NaN, done:false}
a.next(); // Object{value:NaN, done:true}

var b = foo(5);
b.next(); // { value:6, done:false } 第一个next相当于是调用函数
b.next(12); // { value:8, done:false }
b.next(13); // { value:42, done:true }
```

注意，由于 next 方法的参数表示上一个 yield 表达式的返回值，所以在第一次使用 next 方法时，传递参数是无效的。V8 引擎直接忽略第一次使用 next 方法时的参数，只有从第二次使用 next 方法开始，参数才是有效的。从语义上讲，第一个 next 方法用来启动遍历器对象，所以不用带有参数。

### promise + generator + co 库

```js
function* fn() {
  yield new Promise((resolve) => {
    setTimeout(() => {
      console.log(1);
      resolve();
    }, 2000);
  });

  yield new Promise((resolve) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 1000);
  });

  yield new Promise((resolve) => {
    setTimeout(() => {
      console.log(3);
      resolve();
    }, 3000);
  });
}

const gen = fn();
gen.next().value.then(() => {
  gen.next().value.then(() => {
    gen.next();
  });
});
```

改成递归方式调用

```js
function co(gen) {
  const res = gen.next();
  if (res.done) return;
  res.value.then(() => {
    co(gen);
  });
}
```

但是此时没有考虑 co 的返回值为 promise, 所以 co 方法还需返回 promise，一旦返回 promise 又要考虑成功和失败的结果，此时直接使用 co 库。

co 库用于 Generator 函数的自动执行

```js
npm i co
import co from 'co'
co(gen)
```

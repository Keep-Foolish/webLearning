# Class

## 面向对象的特性

- 封装性
- 继承性
- 多态性

## ES6 中的类和对象

### 面向对象

特点： 1.抽取对象公共的属性和行为组织（封装）成类（模版） 2.对类对象进行实例化，获取类的对象

### ES6 中的类和对象

#### 对象

**在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象**， 例如字符串、数值、数组、函数等。
对象是由属性和方法组成的：

- 属性：事物的特征，在对象中用属性来表示（常用名词）
- 方法：事物的行为，在对象中用方法来表示（常用动词）

#### 类

类抽取了对象的公共部分，它泛指某一大类（class）

### 类的基本语法

#### 创建

```js
class name {
  // class body
}

let a = new name();
```

**类必须使用 new 实例化对象**

#### constructor 构造函数

- constructor()方法是类的构造函数（默认方法），用于传递参数，返回实例对象
- 通过 new 命令生成对象实例时，自动调用该方法
- 如果没有显示定义，类内部会自动给我们创建一个 constructor()

**注意：**
（1）通过 class 关键字创建类，类名我们还是习惯性定义首字母大写
（2）类里面有个 constructor 函数，可以接受传递过来的参数，_同时返回实例对象_
（3）constructor 函数 只要 new 生成实例时，就会*自动调用这个函数*，如果我们不写这个函数，类也会自动生成这个函数
（4）生成实例 new 不能省略
（5）最后注意语法规范，_创建类 类名后面不要加小括号_，生成实例 类名后面加小括号，构造函数不需要加 function

#### 在类中添加方法

**不用加 function 关键字**
多个函数方法之间**不需要**添加逗号分隔

#### 类的继承

**extends**
子类可以继承父类的一些属性和方法
**super**
_可以向父类中传递参数_
super 关键字用于访问和调用父类上的函数。
可以调用父类的构造函数，也可以调用父类的普通函数。

注意：

1. 继承中，如果实例化子类输出一个方法，先看子类有没有这个方法，如果有就先执行子类的
2. 继承中，如果子类里面没有，就去查找父类有没有这个方法，如果有，就执行父类的这个方法（就近原则）
3. super.function()就是调用父类中的普通函数

#### 子类扩展自己的方法

**super 必须在子类 this 之前调用**

```js
class father {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  money() {
    console.log("100$");
  }
  sum() {
    console.log(this.x + this.y);
  }
}

class son extends father {
  constructor(x, y) {
    // class要求 super必须在子类this之前调用
    super(x, y); //调用了父类中的构造函数
    this.x = x;
    this.y = y;
  }
  //子类扩展自己的方法
  substrate() {
    console.log(this.x - this.y);
  }
}

var son1 = new son(1, 2);
son1.money();
son1.sum(1, 3);
son1.substrate(1, 3);
```

## 三个注意点

- 1.在 ES6 中类**没有变量提升**，所以必须先定义类，再通过类实例化对象
- 2.类里面的共有的属性和方法一定要**加 this 使用**

```js
class star {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    // 要用this指定共有的属性和方法
    this.sing();
  }
  sing() {
    console.log("lalala");
  }
}

// new的时候会自动执行constructor函数，这里直接打印“lalala”
let liudehua = new star("liudehua", 20);
```

- 3.类里面 this 的指向问题
  constructor 里面的 this 指向的是创建的实例对象
  方法里面的 this，谁调用指向谁
  *如果想在其他方法里面调用 constructor，在外部用一个变量保存 constructor 里面 this 的值*

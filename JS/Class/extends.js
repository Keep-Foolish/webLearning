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
son1.sum(1,3);
son1.substrate(1,3)

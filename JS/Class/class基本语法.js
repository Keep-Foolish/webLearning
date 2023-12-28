class Info {
        constructor(uname,age) {
                //this指向创建的类
                this.uname = uname
                this.age = age
        }

        sayhai(hunman){
                console.log(`${hunman}:` + "HI")
        }
}

let a = new Info("zw",20)
let b = new Info("wyr",21)
console.log(a.uname,a.age)
console.log(b.uname,b.age)

a.sayhai(a.uname)
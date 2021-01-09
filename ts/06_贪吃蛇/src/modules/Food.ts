class Food {
    element: HTMLElement;

    constructor () {
        // 获取页面的food元素
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取食物x轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }

    // 修改食物位置的方法 最小是0 最大290，坐标必须是10的倍数
    change() {
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
    }
}

export default Food;
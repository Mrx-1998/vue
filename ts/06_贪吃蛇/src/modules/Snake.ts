class Snake {

    head: HTMLElement;
    bodies: HTMLCollection;
    element: HTMLElement;

    constructor () {
        // const snake = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.element = document.getElementById('snake')!;
    }

    get X () {
        return this.head.offsetLeft;
    }

    get Y () {
        return this.head.offsetTop;
    }

    set X (value: number) {
        if (this.X === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了');
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            console.log('掉头');
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        this.moveBody()
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }

    set Y (value: number) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error('蛇撞墙了');
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.moveBody()

        this.head.style.top = value + 'px';
        this.checkHeadBody();

    }

    addBody () {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    moveBody () {
        for (let i = this.bodies.length - 1; i > 0; i --) {
            // 获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将值设置到前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';

        }
    }

    checkHeadBody () {
        // 获取所有的身体，检查蛇头是否和身体重叠
        for(let i = 1; i < this.bodies.length; i ++) {
            let bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('撞到自己了')
            }
        }
    }
}

export default Snake;
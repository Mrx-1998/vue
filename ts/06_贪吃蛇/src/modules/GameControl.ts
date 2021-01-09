import Food from './Food';
import Snake from './Snake';
import ScorePanel from './ScorePanel';

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 创建一个属性来储存蛇移动的方向
    direction: string = '';

    // 记录游戏是否结束
    isLive: boolean = true;

    constructor () {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }

    // 创建一个键盘按下的响应函数
    keydownHandler (event: KeyboardEvent) {
        this.direction = event.key;
    }

    // 创建一个蛇移动的方法
    run () {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
                Y -= 10;
                break;
            case 'ArrowDown':
                Y += 10;
                break;
            case 'ArrowRight':
                X += 10;
                break;
            case 'ArrowLeft':
                X -= 10;
                break;
        }
        // 检查蛇是否吃到食物
        if (this.checkEat(X, Y)) {
            console.log('eat');
            // 食物位置重置
            this.food.change();
            this.scorePanel.addSource();
            this.snake.addBody();
        }

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert(e.message);
            this.isLive = false;
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    checkEat(X: number, Y: number) {
        return X === this.food.X && Y === this.food.Y;
    }
}

export default GameControl;
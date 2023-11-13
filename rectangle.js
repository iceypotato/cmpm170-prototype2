class Rectangle {

    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    update() {
        var width = 12
        var height = 8
        rect(this.x - width / 2, this.y - height / 2, width, height)
    }

}
class Circle {

    constructor(x, y, thickness) {
        this.x = x
        this.y = y
        this.thickness = thickness
    }

    update() {
        arc(this.x, this.y, 0, this.thickness)
    }

}
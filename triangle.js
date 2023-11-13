class Triangle {
    constructor(x, y, length) {
        this.x = x
        this.y = y
        this.length = length
    }

    update() {
        // box(this.x, this.y, 1)
        var height = sqrt(3) / 2 * this.length
        var distFromMidpointToCentroid = this.length / sqrt(3)
        var thickness = 4
        bar(this.x, this.y + distFromMidpointToCentroid, this.length * 2, thickness, 0)
        bar(this.x - distFromMidpointToCentroid * cos(PI/6), this.y - distFromMidpointToCentroid * sin(PI/6), this.length * 2, thickness, -PI/3)
        bar(this.x + distFromMidpointToCentroid * cos(PI/6), this.y - distFromMidpointToCentroid * sin(PI/6), this.length * 2, thickness, PI/3)

    }
}
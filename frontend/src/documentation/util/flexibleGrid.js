const flatMap = require("lodash/flatMap")
const map = require("lodash/map")
const fill = require("lodash/fill")
const concat = require("lodash/concat")

class FlexibleGrid {

    grid = []
    emptyValue = ""

    // coordinates start with (0,0), not (1,1)

    // grid (in terms of (y,x) coordinates) =>
    //            [
    //            [[0,0], [0,1], [0,2]],
    //            [[1,0], [1,1], [1,2]],
    //            [[2,0], [2,1], [2,2]]
    //            ]

    constructor(emptyValue) {
        this.emptyValue = emptyValue
    }

    setCells = (from, to, value) => {
        for (let y = from.y; y <= to.y; y++) {
            for (let x = from.x; x <= to.x; x++) {
                this.setCell(x,y,value)
            }
        }
    }

    setCell = (x, y, value) => {
        this.ensureCellExistence(x,y)

        this.grid[y][x] = value
    }

    ensureCellExistence = (x,y) => {
        if (this.grid.length === 0) {
            this.initializeGrid(x+1,y+1)
        }

        // DONT NEED BECAUSE THE ARRAY CAN BE EXTENDED WHEN WE PUSH INTO IT ANYWAY
        // if (this.grid[0].length-1 < x) {
        //     this.extendGridX(x)
        // }


        if (this.grid.length-1 < y) {
            this.extendGridY(y)
        }
    }

    initializeGrid = (x,y) => {
        for (let i = 0; i < y; i++) {
            const gridRowX = []
            for (let ix = 0; ix < x; ix++) {
                gridRowX.push(this.emptyValue)
            }
            this.grid.push(gridRowX)
        }
    }

    extendGridY = (y) => {
        this.grid.push([])
    }

}

module.exports = FlexibleGrid
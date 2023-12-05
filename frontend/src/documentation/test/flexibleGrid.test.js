const FlexibleGrid = require('../util/flexibleGrid')

const main = () => {
    const grid = new FlexibleGrid("")
    grid.setCell(3,2, "x")
    console.log(grid)
}

main()
const map = require('lodash/map')
const throttle = require('lodash/throttle')

const mapWithThrottle = async (collection, iteratee, throttleDelay) => {
    const results = []
    const throttledIteratee = throttle(iteratee, throttleDelay)

    await Promise.all(
        map(collection, (item) => {
            const result = throttledIteratee(item)
            results.push(result)
        })
    )

    return results
}

module.exports = {
    mapWithThrottle
}
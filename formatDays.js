var parse = require('date-fns/parse')

const sample = 'Wednesday, 7 October 2020 7:05:00 PM'

console.log(parse(sample, "EEEE, d MMMM yyyy h:mm:ss a", new Date()))
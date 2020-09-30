const fs = require('fs');
// console.log(text)
const parse = require('date-fns/parse')

class Event {
    round;
    date;
    opponent;
    location;

    constructor(obj) {
        this.round = obj.round;
        this.date = obj.date;
        this.opponent = obj.opponent;
        this.location = obj.location;

    }
}

function checkIfSoccerFC(row) {
    if (row.includes("Soccer")) {
        // console.log(row)
        const index = row.indexOf(' ');
        const arr = [row.slice(0, index), row.slice(index + 1)];
        const splitDate = arr[1].split(" PM")
        let opponent;
        if (splitDate[1].includes("Radford")) {
            let opp = splitDate[1].split(" ")
            opp.splice(-1)
            opp.splice(-1)
            opp.splice(0, 1)
            opponent = opp

        } else if (splitDate[1].includes("ANU")) {
            let opp = splitDate[1].split(" ")
            opp.splice(-1)
            opp.splice(-1)
            opp.splice(-1)
            opp.splice(0, 1)

            opponent = opp
        }
        opponent = opponent.filter(e => e !== "Soccer" && e !== "FC")
        const e = new Event({
            location: (row.includes("Radford")) ? "Radford" : (row.includes("ANU")) ? "ANU" : "NA",
            round: arr[0],
            date: parse(splitDate[0] + " PM", "EEEE, d MMMM yyyy h:mm:ss a", new Date()),
            opponent: opponent.join(" ")
        })
        return e
    }
}

function iterate(text) {
    let eventsArray = []
    const splitData = text.split("\n")
    splitData.forEach(row => {
        const res = checkIfSoccerFC(row)
        if (res) {
            eventsArray.push(res)
        }
    })
    return eventsArray

}

function main() {
    var text = fs.readFileSync('data.txt', 'utf8')
    return iterate(text)
}
main()

module.exports = main
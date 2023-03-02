type TimeBlock = {
    id: number
    start: number
    end: number
    available: number
}

let locations: string[] = []

let timeblocks: TimeBlock[] = []

export function getTimeBlocks() {
    return timeblocks
}

export function addTimeBlock(id: number, start: number, end: number) {
    const timeblock: TimeBlock = {
        id: id,
        start: start,
        end: end,
        available: 0
    }
    timeblocks.push(timeblock)
}

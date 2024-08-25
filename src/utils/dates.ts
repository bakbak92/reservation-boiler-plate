const regular: number[] = [1, 2, 3, 4, 5]
const weekends: number[] = [0, 6]
const allDays: number[] = [0, 1, 2, 3, 4, 5, 6]
const getWeekdays = (days: number[]): number[]=> {
    const allDays: number[] = [0, 1, 2, 3, 4, 5, 6]
    return allDays
      .filter(day => !days.includes(day))
      .map(day => day + 1);
  }

export {
    regular,
    weekends,
    allDays,
    getWeekdays
}
import moment from 'moment'

export const countingHoursWorked = (dateStart: number, dateFinish: number) => moment.duration(moment(timestampToDate(dateStart, '')).diff(timestampToDate(dateFinish, ''))).asHours()
export const calculateDifDate = (dateStart: number, dateFinish: number, type: string ) => { let hour = moment.duration(moment(timestampToDate(dateStart, '')).diff(timestampToDate(dateFinish, '')));  switch (type) { case 'days': return hour.asDays(); case 'hour': return hour.asHours(); case 'minutes': return hour.asMinutes(); case 'seconds': return hour.asSeconds(); default: return hour }}
export const dateNowFormat = (format: string): string => moment().format(format)
export const dateNowTimestamp = (): number => moment().unix()
export const dateToTimestamp = (date: string): number => moment(date).unix()
export const dateCustom = (date: string, format: string): string => moment(date).format(format)
export const dateCustomToTimestamp = (date: string, format: string): number => moment(date, format).unix()
export const timestampToDate = (date: number, format: string): string => moment(new Date(date*1000)).format(format)
export const dateIsBefore = (date: String, dateToCompare: String, format: String): Boolean => moment(date as string, format as string).subtract(1, 'seconds').isBefore(moment(dateToCompare as string, format as string))
export const dateIsAfter = (date: String, dateToCompare: String, format: String): Boolean => moment(date as string, format as string).add(1, 'seconds').isAfter(moment(dateToCompare as string, format as string))
export const dateZoneString = (date: number, format: string, timeZone: string): string => new Date(date * 1000).toLocaleString(format, { timeZone })

export const isJSON = (str: any) => { try { JSON.parse(str) } catch (e) { return false } return true }
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import type { ManipulateType, OpUnitType } from 'dayjs'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export function useDateTime() {
  function strDate(
    datetime: string | null,
    formatFrom: string = 'DD-MMM-YYYY',
    formatTo: string = 'YYYY-MM-DD'
  ): string | null {
    if (!datetime) return null
    const d = dayjs(datetime, formatFrom)
    if (!d.isValid()) return null
    return d.format(formatTo)
  }

  function dateTime(): string {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  }

  function getTime(): string {
    return dayjs().format('HH:mm:ss')
  }

  function dateTransaction(): string {
    return dayjs().format('YYYY-MM-DD')
  }

  function addYear(datetime: string, duration: number): string {
    return dayjs(datetime).add(duration, 'year').format('YYYY-MM-DD')
  }

  function formatDate(datetime: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs(datetime).format(format)
  }

  function dateDiff(dateFrom: string, dateTo: string, durationType: OpUnitType = 'days'): number {
    return dayjs(dateTo).diff(dayjs(dateFrom), durationType)
  }

  function addDatetime(
    datetime: string,
    duration: number,
    durationType: ManipulateType,
    format: string = 'YYYY-MM-DD HH:mm:ss'
  ): string {
    return dayjs(datetime).add(duration, durationType).format(format)
  }

  function dateAsJsdate(datetime: string): Date {
    return dayjs(datetime).toDate()
  }

  function formatDateUtc(
    datetime: string,
    format: string = 'YYYY-MM-DD HH:mm:ss',
    tz: string = 'Asia/Jakarta'
  ): string {
    return dayjs.utc(datetime).tz(tz).format(format)
  }

  function getFirstDate(datetime: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs(datetime).startOf('month').format(format)
  }

  function getLastDate(datetime: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs(datetime).endOf('month').format(format)
  }

  return {
    strDate,
    dateTime,
    getTime,
    dateTransaction,
    addYear,
    formatDate,
    dateDiff,
    addDatetime,
    dateAsJsdate,
    formatDateUtc,
    getFirstDate,
    getLastDate,
  }
}

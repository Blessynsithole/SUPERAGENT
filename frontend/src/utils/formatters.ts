import { format, formatDistanceToNow, parse } from 'date-fns'

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  return format(new Date(date), formatStr)
}

export const formatTime = (date: string | Date): string => {
  return format(new Date(date), 'HH:mm')
}

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

export const timeAgo = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const parseDate = (dateStr: string): Date => {
  return parse(dateStr, 'yyyy-MM-dd', new Date())
}

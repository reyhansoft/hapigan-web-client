export const set = (name: string, value: string, days: number = 0) => {
  var expires = ''
  if (days !== 0) {
    var date = new Date()
    date.setTime(date.getTime() + (days*24*60*60*1000))
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`
}

export const get = (name: string) : string | null => {
  const cookies = document.cookie.split(';')
  const cookie = cookies
    .find(t => t.indexOf('=') !== -1 && t.trim().split('=')[0] === name)
  return cookie
    ? cookie.split('=')[1]
    : null
}

export const remove = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}

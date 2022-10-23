const wait = (delayInMilliseconds: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delayInMilliseconds)
  })
}

export default wait
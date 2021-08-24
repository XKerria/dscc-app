export const currentUrl = () => {
  const pages = getCurrentPages()
  const page = pages?.[pages.length - 1]
  return page?.route ?? null
}

export const fromUrl = () => {
  const pages = getCurrentPages()
  const page = pages?.[pages.length - 2]
  return page?.route ?? null
}

export const cssVar = (name, value=null) => {
  let currentName = name
  if (name.substring(0, 2) !== '--') {
    currentName = `--${currentName}`
  }

  if (value) {
    document.documentElement.style.setProperty(currentName, value)
  }

  return getComputedStyle(document.body).getPropertyValue(currentName)
}

export default cssVar

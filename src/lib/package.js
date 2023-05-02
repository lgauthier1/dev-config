const mergeKeys = (jsonFile, key, obj) => {
  if (!Object.keys(jsonFile).includes(key)) {
    console.warn(`Creation of scripts ${key} in package.json`)
    jsonFile[key] = {}
  }
  jsonFile[key] = { ...jsonFile[key], ...obj }
  return jsonFile
}

export const updatePackage = (jsonFile, scripts = {}, devDependencies = {}) => {
  if (scripts) {
    jsonFile = mergeKeys(jsonFile, 'scripts', scripts)
  }

  if (devDependencies) {
    jsonFile = mergeKeys(jsonFile, 'devDependencies', devDependencies)
  }

  console.log(jsonFile)
  return jsonFile
}

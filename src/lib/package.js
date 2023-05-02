const mergeKeys = (jsonFile, key, obj) => {
  if (!Object.keys(jsonFile).includes(key)) {
<<<<<<< HEAD
    // console.warn(`Creation of ${key} in package.json`)
=======
    console.warn(`Creation of scripts ${key} in package.json`)
>>>>>>> 8574016 (feat/husky auto setup (#5))
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

<<<<<<< HEAD
=======
  console.log(jsonFile)
>>>>>>> 8574016 (feat/husky auto setup (#5))
  return jsonFile
}

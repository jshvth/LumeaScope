export function __rest(source, excluded) {
  const target = {}
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue
      target[key] = source[key]
    }
  }
  if (source != null && typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(source)
    for (let index = 0; index < symbols.length; index += 1) {
      const symbol = symbols[index]
      if (excluded.indexOf(symbol) >= 0) continue
      if (Object.prototype.propertyIsEnumerable.call(source, symbol)) {
        target[symbol] = source[symbol]
      }
    }
  }
  return target
}

export function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P((resolve) => resolve(value))
  }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (error) {
        reject(error)
      }
    }
    function rejected(value) {
      try {
        step(generator.throw(value))
      } catch (error) {
        reject(error)
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected)
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}

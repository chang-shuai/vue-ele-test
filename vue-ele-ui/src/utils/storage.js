/**
 * localStorage工具
 */
export default {
  get(name) {
    const storage = window.localStorage[name]
    try {
      return JSON.parse(storage)
    } catch (e) {
      return storage
    }
  },
  set(name, obj) {
    window.localStorage[name] = JSON.stringify(obj)
  },
  del(name) {
    window.localStorage.removeItem(name)
  },
  clear() {
    window.localStorage.clear()
  }
}

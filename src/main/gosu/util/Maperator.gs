package util

class Maperator<F,T> implements Iterator<T> {
  var underlying : Iterator<F>
  var transform : block(item:F):T
  var count : int
  
  construct(base : Iterator<F>, map : block(item:F):T) {
    underlying = base
    count = 0
    transform = map
  }
  
  construct(base : Iterator<F>, map : block(item:F, n:int):T, offset : int) {
    underlying = base
    count = offset
    transform = \item -> map(item, count) // close over count so the calls don't need to know about it
  }
  
  override function hasNext() : boolean {
    return underlying.hasNext()
  }
  
  override function next() : T {
    try {
      return transform(underlying.next())
    } finally {
      count += 1
    }
  }
  
  override function remove() {
    underlying.remove()
    count += 1
  }
}

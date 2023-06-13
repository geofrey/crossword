package util

class Filterator<T> implements Iterator<T> {
  
  private var underlying : Iterator<T>
  private var condition : block(t:T):Boolean
  private var head : T
  
  private function seek() {
    while(head == null and underlying.hasNext()) {
      var next = underlying.next()
      if(condition(next)) {
        head = next
        return
      }
    }
  }
  
  construct(base : Iterator<T>, filter(t:T) : Boolean) {
    underlying = base
    condition = filter
    head = null
  }
  
  override function hasNext() : boolean {
    seek() // check again in case a source like a network stream has acquired new elements
    return head != null
  }
  
  override function next() : T {
    seek()
    if(head == null) throw new NoSuchElementException()
    var result = head
    head = null
    return result
  }
  
  override function remove() {
    head = null
  }
  
}

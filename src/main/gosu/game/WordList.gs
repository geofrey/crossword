package game
uses gw.util.Pair

class WordList implements List<String> {
  delegate words represents List<String>
  var codex : Map<Pair<Integer,Character>,String>  
  
  construct() {
    words = {}
    codex = {}
  }
  construct(that : List<String>) {
    words = new ArrayList<String>(that.Count)
    that.each(\word -> this.add(word))
  }
  
  override function add(word : String) : boolean {
    if(this.contains(word)) return false
    
    words.add(word)
    for(letter in word.toCharArray() index position) codex.put(new Pair(position, letter), word)
    return true
  }
}
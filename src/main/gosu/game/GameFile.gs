package game

uses java.io.File
uses java.io.BufferedReader
uses java.io.FileReader

class GameFile {
  var file : File
  var _board : Board
  var _wordlist : WordList
  
  construct(textFile : File) {
    file = textFile
  }
  
  function init() {
    using(var reader = new BufferedReader(new FileReader(file))) {
      var lines = reader.lines().iterator()
      lines = new util.Maperator<String, String>(lines, \line -> line.replaceFirst("#.*", "").trim())
      lines = new util.Filterator<String>(lines, \line -> line.HasContent)
    
      var boardentries = lines.next().split(" ")
      var empty = boardentries[0][0]
      var wall = boardentries[1][0]
      print("empty space '${empty}'")
      print("wall '${wall}'")
      
      var dimensions = lines.next().split(" ")
      var width = Integer.parseInt(dimensions[0])
      var height = Integer.parseInt(dimensions[1])
      print("${width} x ${height} board")
      
      _board = new game.Board(width, height)
      for(i in 0..|height) {
        var line = lines.next()
        for(j in 0..|width) {
          
          var datum : Character = line[j]
          print("datum(${datum}) == empty(${empty}): ${datum == empty}")
          print("datum(${datum}) == wall(${wall}): ${datum == wall}")
               if(datum.equals(empty))  datum = ' '
          else if(datum.equals(wall))   datum = null
          _board.write(i, j, datum)
        }
      }
      
      _wordlist = new WordList()
      for(word in lines /* all remaining */) _wordlist.add(word)
      print("${_wordlist.Count} words")
    }
  }
  
  property get Board() : Board {
    if(_board == null) init()
    return _board
  }
  
  property get WordList() : WordList {
    if(_wordlist == null) init()
    return _wordlist
  }
}
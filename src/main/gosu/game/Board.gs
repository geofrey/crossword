package game

class Board {
  
  abstract static class Space {
    var x : int
    var y : int
    var len : int
    var label : String
    construct(i : int, j : int, designation : String, wordlength : int) {
      x = j
      y = i
      label = designation
      len = wordlength
    }
  }
  class HSpace extends Space {
    construct(i : int, j : int, designation : String, size : int) { super(i, j, designation, size) }
    override function toString() : String {
      return "${label}-across (${len}): " + (0..|len).map(\p -> board[y][x+p]).join("")
    }
  }
  class VSpace extends Space {
    construct(i : int, j : int, designation : String, size : int) { super(i, j, designation, size) }
    override function toString() : String {
      return "${label}-down (${len}): " + (0..|len).map(\p -> board[y+p][x]).join("")
    }
  }
  
  var width : int
  var height : int
  var board : Character[][]
  var slots : List<Space>
  
  construct(boardwidth : int, boardheight : int) {
    width = boardwidth
    height = boardheight
    board = new Character[height][width]
  }
  
  function scanForWords() {
    slots = {}
    var startposition : int = 1
    for(i in 0..|board.length) {
      for(j in 0..|board[0].length) {
        var anotherstart = false
        if(i == 0 or board[i-1][j] == null) {
          var size = 0
          while(i+size < height and board[i+size][j] != null) size += 1
          if(size > 1) {
            slots.add(new VSpace(i, j, startposition as String, size))
            anotherstart = true
          }
        }
        if(j == 0 or board[i][j-1] == null) {
          var size = 0
          while(j+size < width and board[i][j+size] != null) size += 1
          if(size > 1) {
            slots.add(new HSpace(i, j, startposition as String, size))
            anotherstart = true
          }
        }
        if(anotherstart) startposition += 1
      }
    }
  }
  property get Spaces() : List<Space> {
    if(slots == null) scanForWords()
    return slots
  }
  
  function read(i : int, j : int) : Character {
    return board[i][j]
  }
  function write(i : int, j : int, value : Character) {
    board[i][j] = value
  }
  
  override function toString() : String {
    var buffer = new StringBuilder()
    for(i in 0..|board.length) {
      for(j in 0..|board[0].length) {
        if(board[i][j] == null) buffer.append("#")
        else buffer.append(board[i][j])
        buffer.append(" ")
      }
      buffer.append("\n")
    }
    return buffer.toString()
  }
  
}

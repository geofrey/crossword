
var file = new java.io.File("./src/main/gosu/data/cereal.txt")
file = file.CanonicalFile
print(file.Path)

var game = new game.GameFile(file)

print(game.Board)

print(game.Board.Spaces.join("\n"))
const myResult = [0, 1, 2, 3, 4, 5, 6]
    .filter((x) => x <= 4)
    .map((x) => x + 2)
    .reduce((total, val) => total + val, 0)

console.log(myResult)
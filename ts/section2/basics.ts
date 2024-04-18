console.log("Hello from section2/app.ts");

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (showResult) {
    const result = n1 + n2;
    console.log(phrase + result);
  } else {
    return (n1 + n2);
  }
}
const number1 = 5;
const number2 = 2.8;
const printResult = true;

const resultPhrase = 'Result is: ';
const result = add(number1, number2, printResult, resultPhrase);
let res = true
res = 3
console.log(result);


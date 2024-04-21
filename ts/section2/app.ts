function add(n1: number, n2: number) {
  return n1+ n2;
}

// function add(n1: number, n2: number) :number  - ts는 이렇게 number가 나올 것이라고 반환값을 추론한다.

 function printResult(num: number):void {
  console.log('Result: ' + num);
}

printResult(add(5, 12));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);

}


let combineValues: (a: number, b: number) => number;
combineValues= add;
// combineValues = 5; // 위 Function이라 안됨.
// combineValues = printResult; // a,b 두개의 인자가 필요한데 하나만 넣었기 때문에 안됨.
console.log(combineValues(8, 8));


addAndHandle(10, 20, (result) => {
  console.log(result);
});

function generateError(message: string, code: number) :never {
  throw {message: message, errorCode: code}
}
generateError('Error', 500);
// console.log(result);
type Combinable = number | string;

function combine(
  input1: number | string,
  input2: number | string,
  resultType: 'as-number' | 'as-text'
) {
  let res;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as-number') {
    res =  +input1 + +input2;
  } else {
    res =  input1.toString() + input2.toString();
  }
  return res;
}

const combinedAges = combine(30, 26, 'as-number');
console.log('combinedAges: ', combinedAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log('combinedNames: ', combinedNames);

const combinedAgesText = combine('30', '26', 'as-number');
console.log('combinedAgesText: ', combinedAgesText);




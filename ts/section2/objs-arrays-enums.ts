
enum Role { ADMIN, READ_ONLY, AUTHOR };
// enum은 관련된 상수값들을 모아놓은 것이다.
  // 관리자 0, 읽기전용 1, 작성자 2 : enum
enum Role2 { ADMIN = 5, READ_ONLY = 100, AUTHOR = 200 };
const person = { // 특정 객체 타입을 위한  {}를 사용 할 수 있다.
  name:'Sergio',
  age: 28,
  hobbies: ['Sports', 'Running'],
  role: Role.ADMIN // enum member Role.ADMIN = 0 이렇게
};

let favouriteActivities: string[];
favouriteActivities = ['Sports', 'Running'];
console.log(person.name);


for (const hobby of person.hobbies) {
  console.log(hobby);
}

console.log(Role2.ADMIN)


# Mongoose

`Mongoose`는 Node.js 환경에서 MongoDB를 쉽게 다루는데 유용한 ODM (Object Data Modeling) 라이브러리.

MongoDB의 NoSQL 특성을 Node.js의 환경에서 객체 지향적 인터페이스를 제공하여 데이터를 관리할 수 있게 도와준다.

## 역할

- 스키마 정의 : 데이터 구조와 타입, 기본값, 유효성 검사 등 강제를 통한 무결성 확보
- 모델링 : 컬렉션에 대응하는 모델을 생성하여 데이터베이스 작업을 추상화된 객체 형태로 실행
- 미들웨어 : 저장, 삭제 등 특정 이벤트 전/후 실행되는 로직 정의 가능
- 편의성 기능

## 주요 요소

### 스키마

Mongoose에서 데이터의 형태를 정의하는 가장 기본이 되는 단위

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 필수 필드 설정
  email: { type: String, unique: true }, // 고유성 제약조건 설정
  createdAt: { type: Date, default: Date.now }, // 기본값 설정
});
```

### 모델

```js
// User 모델 <=> 'users' 컬렉션 대응.
const User = mongoose.model("User", userSchema);

// e.g.
const newUser = new User({ name: "Alice", email: "alice@example.com" });
await newUser.save(); // 데이터 저장
const users = await User.find({ name: "Alice" }); // 데이터 조회
```

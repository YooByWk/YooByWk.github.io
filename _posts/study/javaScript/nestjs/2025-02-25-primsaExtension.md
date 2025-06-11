---
layout: post
title: "Prisma "
subtitle: SoftDelete 만들기.
tags: Prisma
date: 2025-02-25
categories: [ORM]
toc: true
---

# Prisma!

`NestJs`와 `Prisma`를 이용해서 프로젝트를 구현하던 중

`SoftDelete` 방식을 사용하기로 했는데, Delete 요청이 들어왔을 때 Update하는 모습이 전혀 보기 좋지 않았다.

이에 따라 delete를 update로 덮어버릴까도 고민했지만, 언젠가 실제로 db에서 delete하는 경우가 필요할수도 있다는 생각이 들어서 찾아보던 중 `PrismaExtension`을 이용해서 내가 직접 어느정도 구현할 수 있는 선택지가 있다는 사실을 발견했다.

## Prisma Client Extension

[자세한 설명은 공식문서](https://www.prisma.io/docs/orm/prisma-client/client-extensions)

```
You can create an extension with one or more of the following component types:

model: add custom methods or fields to your models
client: add client-level methods to Prisma Client
query: create custom Prisma Client queries
result: add custom fields to your query results

```

이 부분에서 딱 삘이 와서 마구마구 적어보았다.

확장성이나, 여러명이서 협업하는 환경에 적합하리라는 판단이 들었기 때문이다.

## 구현 전

**코드 작성 전에 생각한 내용**

1. 주로 사용하는 것
2. 실제 요소(delete <-> update) 등 차이점 생각
3. 2번을 고려했을 때 실제로 필요한 것

해당 과정을 통해 내린 결론은 다음과 같다.

1. delete를 통해 들어올 경우 내가 설정한 extension의 delete를 작동하게 한다.

   1. 기존의 경우 `update`로 `delete` 요청을 처리하고 있었다.
   2. 삭제는 1개 삭제와 다수 삭제가 있다.
   3. update는 `deleted`를 수정한다.
   4. softDelete가 적용된 모델은 별도로 존재한다!

2. `deleted`를 따로 제외하는 코드를 작성하고 있으므로 이를 피할 수 있도록한다.
   1. 매번 해당 요소를 제외하는 것도 귀찮다!

이런 방향성으로 구현을 해보기로 했다.

## 내가 구현한 코드

1. 삭제와 관련된 코드

위에서 생각한 내용을 내가 할 수 있는 선에서 구현했다.

1-4의 적용된 모델이 별도로 존재한다는 부분을 이용해서 적용할 수 있었다.

```ts
const softDeleteModel = [
  "Model1",
  "Model2",
  "Model3",
  "Model4",
  "Model5",
  "Model6",
  "Model7",
];

export const softDelete = Prisma.defineExtension({
  name: "softDelete",
  model: {
    $allModels: {
      async softDelete<T>(this: T, where: Prisma.Args<T, "delete">) {
        const context = Prisma.getExtensionContext(this);
        const data = { deletedAt: new Date() };
        return (context as any).update({
          ...where,
          data,
        });
      },
    },
  },
});

export const softDeleteMany = Prisma.defineExtension({
  name: "softDeleteMany",
  model: {
    $allModels: {
      async softDeleteMany<T>(this: T, where: Prisma.Args<T, "deleteMany">) {
        const context = Prisma.getExtensionContext(this);
        const data = { deletedAt: new Date() };

        return (context as any).updateMany({
          where,
          data,
        });
      },
    },
  },
});
```

2. 조회와 관련된 코드

해당 코드 또한

```ts
export const filterDeleted = Prisma.defineExtension({
  name: "filterDeleted",
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (
          (softDeleteModel.includes(model) && operation === "findFirst") ||
          operation === "findUnique" ||
          operation === "findMany"
        ) {
          if (args.where["deletedAt"] === undefined) {
            args.where = { ...args.where, deletedAt: null };
            return query(args);
          } else {
            return query(args);
          }
        }
        return query(args);
      },
    },
  },
});
```

## 사용 예시

```ts
await this.prismaService.client.user.softDelete({ where: { id } });
```

이렇게 prismaService 뒤에 client를 통해서 내가 정의한 extension에 접근해서 사용할 수 있다.

## 결론

이렇게 Prisma Extension을 활용해서 SoftDelete를 구현해봤다.  
처음엔 단순히 delete 요청을 update로 바꾸는 게 어색해 보였지만,  
직접 확장 기능을 만들어보니 확장성과 유지보수 측면에서 더욱 유연하게 사용할 수 있다는 걸 느꼈다.

이제 delete 요청을 받았을 때도 일관된 방식으로 처리할 수 있고,  
조회 시에도 deletedAt 필드를 매번 신경 쓰지 않아도 돼서 코드의 가독성도 개선되었다.

배운 점 & 앞으로의 방향

- Prisma Extension을 활용하면 단순한 CRUD 이상의 기능을 손쉽게 추가할 수 있다.
- 협업 시 일관된 데이터 처리 방식이 필요할 때 이런 접근법이 유용하다.
- SoftDelete와 같은 기능을 적용할 때, 단순한 코드 수정보다 확장성을 고려한 구현이 중요하다.
- 새로운 기능을 도입할 때는 그 방식이 정말 효율적인지, 장기적으로 관리하기 쉬운지 항상 고민해야 한다.

이번 경험을 통해 확장성과 유지보수의 중요성을 다시금 깨달았다.

앞으로도 더 좋은 방법이 있을지 꾸준히 고민해보자!

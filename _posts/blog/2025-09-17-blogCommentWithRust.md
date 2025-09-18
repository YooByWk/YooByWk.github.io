---
layout: post
title: "댓글을 바꿔보자"
subtitle: 근데 러스트를 곁들인.
date: 2025-09-17
categories: [블로그]
toc: true
series: "Blog"
---

# 한 줄 요약

되긴 하는데 당장 배포해놓을 방법이 없음.

# 첫 Rust 프로젝트 - 대충 API 댓글 서버 만들기

> 진짜로 그러고 싶어요? 네.

진짜로 하고싶어서 해봤음.

Rust는 처음이라 cargo new로 프로젝트를 만들었는데

## 프로젝트 시작하기

`cargo new %이름%`

와~! 쉽다.

여기까지는 얼마나 어려울지 몰랐지...

### toml?

cargo.toml이라는 파일인데 npm의 `package.json` 같은 느낌?

프로젝트의 이름 버전 그리고 어떤 라이브러리 (crate 라고 부른다 한다.)를 쓸 건지 여기에 작성한다.

대충 이런 느낌

```toml
[package]
name = "comment-api"
version = "0.1.0"
edition = "2024"

[dependencies]
axum = "0.8.4"
serde = {version = "1.0.225", features = ["derive"]}
tokio = {version = "1.47.1", features = ["full"]}
serde_json = "1.0.145"
rusqlite = {version = "0.37.0", features = ["bundled"]}
uuid ={ version =  "1.18.1" , features = ["v4"]}
bcrypt = "0.17.1"
r2d2 = "0.8.10"
r2d2_sqlite = "0.31.0"
chrono = "0.4.42"
anyhow = "1.0.99"
tower-http = {version = "0.6.6", features =  ["cors"]}
```

### 의존성 설치

cargo가 알아서 해준다. 신기신기

이것저것 찾아본 결과

- axum : 웹 프레임워크
- serde : 데이터 직렬화, 역직렬화
- tokio : 비동기 프로그래밍
- rusqlite : SQLite DB
- serde_json : json 데이터 처리
- uuid : 고유 식별자
- time, tracing, tracing-subscriber : 로깅과 시간 처리를 위함
- chrono : 시간 같음...
- tower-htpp : CORS 해결하려고 사용함
- bcrypt : 댓글 비밀번호 해싱용

## 시작부터 망했다!

### 1. derive가 뭐죠..?

> 띠용.

Rust의 매크로라고 한다.

```rs
#[derive(Debug)]
pub struct 뭔가뭔가 {
  // ...
}
```

이 경우 println! 으로 구조체를 쉽게 출력할 수 있게 해준다.

그리고 문법이... 처음보는 내게는 외계어 같은 느낌이 없잖아 들었는데. 뭐 익숙해져야지.

## 어쨋든 작업하자.

### main

메인 파일. 서버를 시작하고 라우팅을 설정하는 등 전체적인 흐름을 관리하는...

```rs
mod db;
mod handlers;
mod models;

use axum::{
    Router,
    routing::{get, post},
};
use db::{DbPool, init_db};
use handlers::{AppState, add_comment, delete_comment, get_comments};
use r2d2_sqlite::SqliteConnectionManager;
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    let manager = SqliteConnectionManager::file("comments.db");
    let pool = DbPool::new(manager).expect("DB 풀 생성 실패");

    init_db(&pool).expect("DB 초기화 실패");

    let state = AppState { pool };
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/add", post(add_comment))
        .route("/list/{post}", get(get_comments))
        .route("/delete/{id}", post(delete_comment))
        .with_state(state)
        .layer(cors);

    let addr = SocketAddr::from(([0, 0, 0, 0], 7777));
    println!("서버 실행중: http://{}", addr);
    let listener = TcpListener::bind(addr).await.expect("리스너 바인딩 실패");

    axum::serve(listener, app).await.unwrap();
}
```

- mod : 다른 파일을 가져옴
- `#[tokio::main] async fn main():` tokio 크레이트를 사용해서 비동기 코드를 실행하는 메인 함수
- with_state: AppState라는 구조체로 DB 연결 풀을 넘겨줌. 모든 핸들러 함수가 DB에 접근할 수 있게.
- Router: `/add`, `/list/{post}`, `/delete/{id}` 같은 API 엔드포인트 정의

### handler

진짜 로직은 여기에.

```rs
use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
};
use bcrypt::{DEFAULT_COST, hash, verify};
use chrono::Utc;
use serde_json::json;
use uuid::Uuid;

use crate::db::DbPool;
use crate::models::{Comment, CommentChild, CommentInput, CommentOutput};

#[derive(Clone)]
pub struct AppState {
    pub pool: DbPool,
}

// 댓글 추가
pub async fn add_comment(
    State(state): State<AppState>,
    Json(payload): Json<CommentInput>,
) -> Result<Json<Comment>, StatusCode> {
    let conn = state
        .pool
        .get()
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let user_uuid = Uuid::new_v4().to_string();
    let now = Utc::now().to_rfc3339();

    let hashed_password =
        hash(&payload.password, DEFAULT_COST).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    conn.execute(
        "INSERT INTO comments (post, parent, content, writer, password, user_uuid, ip, created_at, deleted)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
        (
            &payload.post,
            &payload.parent,
            &payload.content,
            &payload.writer,
            &hashed_password,
            &user_uuid,
            None::<String>,
            &now,
            false,
        ),
    )
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let id = conn.last_insert_rowid();

    Ok(Json(Comment {
        id,
        post: payload.post,
        parent: payload.parent,
        content: payload.content,
        writer: payload.writer,
        password: "".to_string(),
        user_uuid,
        ip: None,
        created_at: now,
        deleted: false,
    }))
}

pub async fn get_comments(
    State(state): State<AppState>,
    Path(post): Path<String>,
) -> Result<Json<Vec<CommentOutput>>, StatusCode> {
    let conn = state
        .pool
        .get()
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let mut stmt = conn
        .prepare(
            "SELECT id, parent, content, writer, user_uuid, created_at, deleted
             FROM comments WHERE post = ?1 ORDER BY created_at ASC",
        )
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let comments_iter = stmt
        .query_map([&post], |row| {
            Ok(Comment {
                id: row.get(0)?,
                post: post.clone(),
                parent: row.get(1)?,
                content: row.get(2)?,
                writer: row.get(3)?,
                password: "".to_string(),
                user_uuid: row.get(4)?,
                ip: None,
                created_at: row.get(5)?,
                deleted: row.get(6)?,
            })
        })
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let mut root_comments = Vec::new();
    let mut children_map = std::collections::HashMap::new();

    for c in comments_iter {
        let c = c.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
        if let Some(parent_id) = c.parent {
            children_map
                .entry(parent_id)
                .or_insert_with(Vec::new)
                .push(CommentChild {
                    id: c.id,
                    content: c.content,
                    writer: c.writer,
                    user_uuid: c.user_uuid,
                    created_at: c.created_at,
                    deleted: c.deleted,
                });
        } else {
            root_comments.push(CommentOutput {
                id: c.id,
                content: c.content,
                writer: c.writer,
                user_uuid: c.user_uuid,
                created_at: c.created_at,
                deleted: c.deleted,
                children: vec![],
            });
        }
    }

    for rc in &mut root_comments {
        if let Some(children) = children_map.get(&rc.id) {
            rc.children = children.clone();
        }
    }

    Ok(Json(root_comments))
}

#[derive(Debug, serde::Deserialize)]
pub struct DeleteCommentInput {
    pub password: String,
}

pub async fn delete_comment(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(payload): Json<DeleteCommentInput>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let conn = state
        .pool
        .get()
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let mut stmt = conn
        .prepare("SELECT password FROM comments WHERE id = ?1")
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    let hashed_password: String = stmt
        .query_row([id], |row| row.get(0))
        .map_err(|_| StatusCode::NOT_FOUND)?;

    let is_valid = verify(&payload.password, &hashed_password)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if !is_valid {
        return Err(StatusCode::UNAUTHORIZED);
    }

    conn.execute("UPDATE comments SET deleted = 1 WHERE id = ?1", [id])
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(json!({"status": "deleted"})))
}
```

### model

데이터 구조 정의

```rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CommentInput {
    pub post: String,
    pub parent: Option<i64>,
    pub content: String,
    pub writer: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Comment {
    pub id: i64,
    pub post: String,
    pub parent: Option<i64>,
    pub content: String,
    pub writer: String,
    pub password: String,
    pub user_uuid: String,
    pub ip: Option<String>,
    pub created_at: String,
    pub deleted: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CommentOutput {
    pub id: i64,
    pub content: String,
    pub writer: String,
    pub user_uuid: String,
    pub created_at: String,
    pub deleted: bool,
    pub children: Vec<CommentChild>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CommentChild {
    pub id: i64,
    pub content: String,
    pub writer: String,
    pub user_uuid: String,
    pub created_at: String,
    pub deleted: bool,
}
```

### db

SQLite 데이터베이스를 초기화하고 연결 풀을 관리

```rs
// 파일명: dbrs
use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::params;

pub type DbPool = Pool<SqliteConnectionManager>;

pub fn init_db(pool: &DbPool) -> anyhow::Result<()> {
    let conn = pool.get()?;
    conn.execute(
        r#"
        CREATE TABLE IF NOT EXISTS comments (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            post        TEXT NOT NULL,
            parent      INTEGER,
            content     TEXT NOT NULL,
            writer      TEXT NOT NULL,
            password    TEXT NOT NULL,
            user_uuid   TEXT NOT NULL,
            ip          TEXT,
            created_at  TEXT NOT NULL,
            deleted     BOOLEAN DEFAULT 0
        )
        "#,
        [],
    )?;
    Ok(())
}
```

## 결론

아. 이런건 Go로 할걸.

사실 개발도 해놓고, 프론트도 완성해놨지만...

배포를 할 방법이 없어서 당장은 블로그에 댓글을 달 수 없다.

매우매우 아쉽다는 이야기

그래도 새로운 언어로 취미생활을 해 보니 즐거웠다.

다음에 또 만나 Rust!

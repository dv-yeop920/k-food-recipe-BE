# K-food-recipe

## 프로젝트 소개

```
k-food-recipe 클라이언트에 정보를 제공하는 백엔드 프로젝트 입니다.
```

</br>

## 목차

1. [기술 및 개발 환경](#기술-및-개발-환경)
2. [아키텍처](#아키텍처)
3. [폴더 구조](#폴더-구조)
4. [주요 기능](#주요-기능)

</br>

## 기술 및 개발 환경

#### ✔️ 사용 기술

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>
</br>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=Express&logoColor=white"/>
</br>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=Mongoose&logoColor=white"/>
</br>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/> <img src="https://img.shields.io/badge/Bcrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white"/>
</br>

#### ✔️ 배포 및 환경

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/Cloud Type-000000?style=for-the-badge&logologoColor=white"/>

<br>

## 아키텍처

![architcture](https://github.com/dv-yeop920/k-food-recipe-FE/assets/104065347/cf5c1d6e-fc16-43b4-89fa-8265b025afab)
<br>

## 폴더 구조

<details>
<summary>📁</summary>
<div>

```
📦config
 ┗ 📜database.js
📦middleware
 ┗ 📜auth.js
📦models
 ┣ 📜comment.model.js
 ┣ 📜notice-board.model.js
 ┣ 📜recipe.model.js
 ┗ 📜user.model.js
📦routes
 ┣ 📜comment.route.js
 ┣ 📜post.route.js
 ┣ 📜recipe.route.js
 ┗ 📜user.route.js
📦services
 ┣ 📜comment.services.js
 ┣ 📜post.services.js
 ┣ 📜recipe.services.js
 ┗ 📜user.services.js
📜index.js
```

</div>
</details>

- `config` : 설정 파일
- `middleware` : 미들웨어 로직
- `models` : mongoDB 모델 스키마
- `routes` : 라우트 경로
- `services` : 비지니스 로직
- `index.js` : 프로젝트 인덱스 파일
  <br>

## 주요 기능

### ⭐️ 공통

- 쿼리 파라미터를 받아 리스트 무한스크롤
- 쿼리 파라미터를 받아 리스트 필터링

### 📃 메인 페이지

- 레시피 리스트 제공 (무한스크롤)
- 레시피 필터링 (탭, 검색)

### 🫕 레시피 상세 페이지

- 레시피 상세 정보 제공

### 👩‍👩‍👧‍👦 레시피 공유 게시판 페이지

- 게시판 리스트 제공 (페이징)
- 게시물 검색

### 📜 게시물 상세 페이지

- 게시물 상세 정보 제공
- 게시물 삭제
- 댓글 CRUD + (무한스크롤)

### 📝 게시물 작성 페이지

- 게시물 작성 기능

### 📝 게시물 수정 페이지

- 게시물 수정 기능
- 게시물 상세 정보 제공

### 🔒 로그인 / 회원가입

- bcrypt를 이용한 비밀번호 암호화
- 회원 가입, 로그인시 유효성 검사
- JWT 이용한 토큰 발행 및 인증
  <br>

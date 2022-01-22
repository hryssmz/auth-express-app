# README

## 1. Getting Started

---

### 1.1. Project Initialization

---

Clone the empty repository and `cd` to the repository root.

Execute the following commands to create `package.json`.

```bash
npm init
```

### 1.2. Install Development Tools

---

#### 1.2.1. TypeScript

---

```bash
npm install -D ts-node @types/node
npx tsc --init
```

#### 1.2.2. Prettier

---

```bash
npm install -D prettier @prettier/plugin-pug prettier-plugin-sh
```

#### 1.2.3. ESLint

---

```bash
npm install -D eslint eslint-config-prettier eslint-plugin-import
npm init @eslint/config
```

#### 1.2.4. Husky

---

```bash
npm install -D husky
npx husky install
npm set-script prepare "husky install"
```

Add some empty Husky scripts.

```bash
npx husky add .husky/pre-commit "exit 0"
npx husky add .husky/pre-push "exit 0"
```

#### 1.2.5. lint-staged

---

```bash
npm install -D lint-staged
```

#### 1.2.6. Jest

---

```bash
npm install -D jest @types/jest eslint-plugin-jest
npx jest --init
```

#### 1.2.7. Babel

---

```bash
npm install -D babel-jest @babel/core @babel/preset-env @babel/preset-typescript
```

#### 1.2.8. supertest

---

```bash
npm install -D supertest @types/supertest
```

#### 1.2.9. nodemon

---

```bash
npm install -D nodemon
```

### 1.3. Initialize Express Project

---

#### 1.3.1. Express

---

```bash
npm install express
npm install -D @types/express
```

#### 1.3.2. Mongoose

---

```bash
npm install mongoose
```

#### 1.3.3. Pug

---

```bash
npm install pug
```

#### 1.3.4. HTTP errors

---

```bash
npm install http-errors
npm install -D @types/http-errors
```

#### 1.3.5. morgan

---

```bash
npm install morgan
npm install -D @types/morgan
```

#### 1.3.6. Other Dependencies

---

```bash
# Express validator.
npm install express-validator

# luxon.
npm install luxon
npm install -D @types/luxon
```

## 2. Add Authentication System

---

### 2.1. passport

---

```bash
npm install passport passport-local
npm install -D @types/passport @types/passport-local
```

### 2.2. express-session

---

```bash
npm install express-session
npm install -D @types/express-session
```

### 2.3. crypto-js

---

```bash
npm install crypto-js
npm install -D @types/crypto-js
```

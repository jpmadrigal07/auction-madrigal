## Running the application

### Step 1:

Clone this repository to your local machine using this command

```bash
git clone https://github.com/jpmadrigal07/auction-madrigal.git
```

If you don't have access the repository, please contact the owner on this email `jp.madrigal07@gmail.com`

### Step 2:

Setup PostgreSQL database. Follow the steps in these youtube videos

WINDOWS: [How to Install PostgreSQL 15 on Windows 10](https://www.youtube.com/watch?v=0n41UTkOBb0)

MAC: [How to Install PostgreSql in Mac M1/M2](https://www.youtube.com/watch?v=fwPR-PCY0h8)

UBUNTU: [How to Install and Set Up PostgreSQL Database on Ubuntu 22.04](https://www.youtube.com/watch?v=Dvhz2mHgNdg)

After the successful installation, create a database name `auction-madrigal`.

### Step 3:

Setup `.env` file and add this values

```bash
LOCAL_DATABASE_URL=postgresql://[DB_USERNAME]:[DB_PASS]@localhost:5432/[DB_NAME]?schema=public
JWT_SECRET=YNd7m0D6vYROHaS4eq0UFnwsb@XD!rBbmWUxgkHySifHx4SaVn
ENCRYPT_KEY=kb$sgUAX@AM9JMEqsjCS41PjiQd$84RtzrniEWfurace3sAOIC
WEB_URL=http://localhost:3000
```

Notice that on `LOCAL_DATABASE_URL` above, there is `[DB_USERNAME]`, `[DB_PASS]` and `[DB_NAME]`. Change the values of those to these:

`[DB_USERNAME]` -> Your postgreSQL username

`[DB_USERNAME]` -> Your postgreSQL password

`[DB_NAME]` -> The database you created on `Step 2` name `auction-madrigal`

Example: `LOCAL_DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/auction-madrigal?schema=public`

After that, run this command

```bash
npx prisma migrate dev
```

### Step 4:

Install dependencies:

```bash
npm i
# or
yarn
# or
pnpm
```

To run the app, run this command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
and you are done 🎉

## Application Demo

[https://auction-madrigal.vercel.app/](https://auction-madrigal.vercel.app/)

## Architecture

![Image Link](/public/AuthenticationArchitecture.png)  


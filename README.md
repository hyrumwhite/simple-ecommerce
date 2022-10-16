# Getting Started


## Database Initialization

1. Install postgresql, see: https://www.postgresqltutorial.com/postgresql-getting-started/

2. Connect to postgres with: 
`sudo -u postgres psql`
3. Update the password for the default "postgres" user:
`alter role postgres with password 'postgres';`
4. Create your database

5. Create a .env file in the root of this project with the following:

```bash 
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=yourpassword
PGDATABASE=yourdbname
PGPORT=5432
```
6. run `npm run initdb`

## Running the app

Run the following commands
```bash
cd ./simple-ecommerce
npm i
npm run dev
```

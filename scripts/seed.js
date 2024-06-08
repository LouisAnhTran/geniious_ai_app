const {db}=require('@vercel/postgres');


async function createUsers(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      await client.sql`drop table if exists users`;
      // Create the "users" table if it doesn't exist
      console.log("drop table user successfully")
      
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          userId Varchar(50) NOT NULL PRIMARY KEY,
          count INT NOT NULL
        );
      `;
  
      console.log(`Created "users" table`);
  
      return {
        createTable,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }


async function main() {
    const client = await db.connect();
  
    await createUsers(client);
    // await seedCustomers(client);
    // await seedInvoices(client);
    // await seedRevenue(client);
  
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
  
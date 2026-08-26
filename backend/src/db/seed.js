import { db } from './database.js';

async function runSeed() {
  console.log('Seeding Database...');
  await db.init();
  await db.seed();
  console.log('Done!');
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

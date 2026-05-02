import 'dotenv/config';
import app from './app';
import { AppDataSource } from './database/typeorm/typeorm.config';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Connected to DB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to DB:', error);
    process.exit(1);
  });

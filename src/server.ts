import 'dotenv/config';
import app from './app';
import { AppDataSource } from './database/typeorm/typeorm.config';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado a Supabase');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la DB:', error);
    process.exit(1);
});
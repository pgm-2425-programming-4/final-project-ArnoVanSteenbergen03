module.exports = ({ env }) => {
  // Get the complete database URL from environment
  const connectionString = env('DATABASE_URL');
  
  // Basic validation
  if (!connectionString) {
    throw new Error('DATABASE_URL is required');
  }

  return {
    connection: {
      client: 'postgres',
      connection: connectionString,
      ssl: { rejectUnauthorized: false },
      pool: {
        min: 2,
        max: 10
      }
    }
  };
};
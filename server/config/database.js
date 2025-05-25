module.exports = ({ env }) => {
  const dbUrl = env('DATABASE_URL');

  const connection = dbUrl
    ? {
        client: 'postgres',
        connection: dbUrl,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT'),
          database: env('DATABASE_NAME'),
          user: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
          ssl: env.bool('DATABASE_SSL', false) && {
            rejectUnauthorized: false,
          },
        },
      };

  return {
    connection: {
      ...connection,
      pool: {
        min: 2,
        max: 10,
      },
    },
  };
};

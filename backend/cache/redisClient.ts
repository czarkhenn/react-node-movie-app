import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});

// Log Redis connection errors
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Connect to Redis
async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('Connected to Redis');
    }
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
}

// Ensure Redis connects on import
connectRedis();

export default redisClient;

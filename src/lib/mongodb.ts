import mongoose from 'mongoose';

// Priority: an explicitly configured remote MONGODB_URI always wins. When it is
// not set, local development falls back to the embedded MongoDB started by
// `pnpm dev:mongo` (see scripts/dev-mongo.ts). Production never falls back.
const LOCAL_MONGODB_URI =
  process.env.LOCAL_MONGODB_URI || 'mongodb://127.0.0.1:27017/hirelytics';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  (process.env.NODE_ENV === 'production' ? undefined : LOCAL_MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable (or run `pnpm dev:mongo` for a local database)'
  );
}

export const usingLocalMongo = !process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// Define the type for the cached mongoose instance
interface CachedMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add mongoose to the NodeJS global type
declare global {
  // eslint-disable-next-line no-var
  var mongoose: CachedMongoose | undefined;
}

let cached: CachedMongoose = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('[MongoDB] Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    if (usingLocalMongo) {
      console.log(
        `[MongoDB] MONGODB_URI not set — using local MongoDB at ${LOCAL_MONGODB_URI}. ` +
          'Start it with `pnpm dev:mongo` if it is not running.'
      );
    }
    console.log('[MongoDB] Creating new database connection');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('[MongoDB] Connection established successfully');
      return mongoose;
    });
  }

  try {
    console.log('[MongoDB] Waiting for database connection...');
    cached.conn = await cached.promise;
    console.log('[MongoDB] Connection ready');
  } catch (e) {
    console.error('[MongoDB] Connection failed:', e);
    if (usingLocalMongo) {
      console.error(
        '[MongoDB] Hint: the local database is not reachable. Run `pnpm dev:mongo` in another terminal.'
      );
    }
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

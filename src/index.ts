import { server } from './server';
import { database } from './database';

server.listen(server.get('port'));
console.info(`Server running on port: ${server.get('port')}`);

database();

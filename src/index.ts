import { server } from './server';

server.listen(server.get('port'));
console.info(`Server running on port ${server.get('port')}`);

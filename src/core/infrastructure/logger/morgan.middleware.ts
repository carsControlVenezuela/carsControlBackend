import morgan, { StreamOptions } from 'morgan';
import { AppLogger } from './winston.logger';

const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED    = '\x1b[31m';
const DIM    = '\x1b[2m';
const RESET  = '\x1b[0m';

const colorStatus = (status: number): string => {
  if (status >= 500) return `${RED}${status}${RESET}`;
  if (status >= 400) return `${YELLOW}${status}${RESET}`;
  return `${GREEN}${status}${RESET}`;
};

const colorMethod = (method: string): string => {
  if (method === 'GET')    return `${GREEN}${method}${RESET}`;
  if (method === 'POST')   return `${YELLOW}${method}${RESET}`;
  if (method === 'PUT')    return `${YELLOW}${method}${RESET}`;
  if (method === 'DELETE') return `${RED}${method}${RESET}`;
  return method;
};

morgan.token('colorStatus', (_req, res) => colorStatus(res.statusCode));
morgan.token('colorMethod', (req) => colorMethod(req.method ?? ''));
morgan.token('separator', () => `${DIM}${'─'.repeat(45)}${RESET}`);

const stream: StreamOptions = {
  write: (message: string) => AppLogger.info(message.trim(), { context: 'HTTP' })
};

export const httpLogger = morgan(
  ':colorMethod :url :colorStatus — :response-time ms\n:separator',
  { stream }
);
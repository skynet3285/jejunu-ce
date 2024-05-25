import axios from 'axios';

const serverPath = 'http://localhost';
const serverPort = 3001;
const serverUrl = `${serverPath}:${serverPort}/promptpost`;

export default async function executeQuery(query: string): Promise<any> {
  const response = await axios.post(serverUrl, { query });
  return response;
}

export function decodeBase64(encoded: string): string {
  return atob(encoded);
}

export function encodeBase64(decoded: string): string {
  return btoa(decoded);
}

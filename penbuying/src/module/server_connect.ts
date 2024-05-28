import axios from 'axios';

const DBServerHOST = 'http://127.0.0.1';
const DBServerPort = 3001;
const DBServerUrl = `${DBServerHOST}:${DBServerPort}/sql_prompt`;

const FileServerHOST = 'http://127.0.0.1';
const FileServerPort = 3002;
const FileServerUrl = `${FileServerHOST}:${FileServerPort}/file_download`;

export async function executeQuery(query: string): Promise<any> {
  const response = await axios.post(DBServerUrl, { query });
  return response;
}

export async function downloadFile(filepath: string): Promise<any> {
  const response = await axios.get(`${FileServerUrl}?file=${filepath}`);
  return response;
}

export function getDownloadFileUrl(filepath: string): string {
  return `${FileServerUrl}?file=${filepath}`;
}

// export function decodeBase64(encoded: string): string {
//   return atob(encoded);
// }

// export function encodeBase64(decoded: string): string {
//   return btoa(decoded);
// }

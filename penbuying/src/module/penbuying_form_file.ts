import { getDownloadFileUrl } from './server_connect';

export function getFormFileContractOfSale(): string {
  return getDownloadFileUrl('부동산 공유지분 매매계약서.hwp');
}

export function getFormFileLocationConfirmationConsent(): string {
  return getDownloadFileUrl('부동산 공유지분 위치확인동의서.hwp');
}

export function getFormFileTermsOfUse(): string {
  return getDownloadFileUrl('펜바잉 이용약관.hwp');
}

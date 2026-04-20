import client from './api-client'

export interface DNSRecord {
  domain: string
  status: string
  lastChecked: string
}

export const dnsService = {
  checkDomain: (domain: string) =>
    client.post<DNSRecord>('/dns/check', { domain }),
  getDomainRecords: (domain: string) =>
    client.get<DNSRecord[]>(`/dns/${domain}`),
}

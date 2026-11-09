export type LeadPayload = {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  customerType?: string;
  service: string;
  equipment?: string;
  subject?: string;
  message: string;
  preferredContact?: string;
};

export type LeadSubmissionResult =
  { status: 'sent' } | { status: 'not-configured' } | { status: 'failed' };

export async function submitLead(payload: LeadPayload): Promise<LeadSubmissionResult> {
  const endpoint = import.meta.env.VITE_LEADS_API_URL?.trim();
  if (!endpoint) return { status: 'not-configured' };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.ok ? { status: 'sent' } : { status: 'failed' };
  } catch {
    return { status: 'failed' };
  }
}

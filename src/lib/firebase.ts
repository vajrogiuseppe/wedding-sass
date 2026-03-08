// Mock Firebase service using localStorage
// Drop-in replace with Firebase Firestore later

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  weddingDate?: string
  message?: string
  status: 'new' | 'contacted' | 'converted' | 'lost'
  createdAt: string
}

const LEADS_KEY = 'inviti_leads'

export const saveLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead => {
  const leads = getLeads()
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  leads.push(newLead)
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  return newLead
}

export const getLeads = (): Lead[] => {
  try {
    const data = localStorage.getItem(LEADS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const updateLeadStatus = (id: string, status: Lead['status']): void => {
  const leads = getLeads()
  const index = leads.findIndex(l => l.id === id)
  if (index !== -1) {
    leads[index].status = status
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  }
}

export const deleteLead = (id: string): void => {
  const leads = getLeads().filter(l => l.id !== id)
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
}

// Seed with mock data for demo
export const seedMockLeads = (): void => {
  const existing = getLeads()
  if (existing.length > 0) return
  const mockLeads: Lead[] = [
    { id: '1', name: 'Sofia & Marco Bianchi', email: 'sofia@example.com', phone: '+39 340 123 4567', weddingDate: '2026-06-15', message: 'Vorremmo un invito elegante con tema floreale', status: 'new', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '2', name: 'Giulia Rossi & Andrea Conti', email: 'giulia@example.com', phone: '+39 347 987 6543', weddingDate: '2026-09-20', message: 'Interessati al piano premium', status: 'contacted', createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '3', name: 'Francesca Marino', email: 'francesca@example.com', weddingDate: '2026-08-10', message: 'Budget limitato, piano starter', status: 'converted', createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '4', name: 'Laura & Pietro Greco', email: 'laura@example.com', phone: '+39 333 456 7890', weddingDate: '2026-07-05', message: 'Cerimonia in Sicilia, 200 ospiti', status: 'new', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '5', name: 'Valentina Ferrari', email: 'valentina@example.com', weddingDate: '2026-10-12', message: 'RSVP digitale con gestione ospiti', status: 'lost', createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString() },
  ]
  localStorage.setItem(LEADS_KEY, JSON.stringify(mockLeads))
}

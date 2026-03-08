import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LogOut, Trash2, Eye, Check } from 'lucide-react'
import { getLeads, updateLeadStatus, deleteLead, seedMockLeads, type Lead } from '@/lib/firebase'

const PASSWORD = 'admin2025'
const SESSION_KEY = 'inviti_admin_auth'

const statusConfig = {
  new: { label: 'Nuovo', cls: 'bg-blue-50 text-blue-700' },
  contacted: { label: 'Contattato', cls: 'bg-amber-50 text-amber-700' },
  converted: { label: 'Convertito', cls: 'bg-emerald-50 text-emerald-700' },
  lost: { label: 'Perso', cls: 'bg-rose-50 text-rose-700' },
}

type FilterStatus = 'all' | Lead['status']

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pwd === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onAuth()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-display text-3xl italic font-semibold text-warm-dark mb-2">
            inviti<span className="text-gold">.</span>studio
          </div>
          <p className="text-sm text-muted">Area amministrativa</p>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-gold/20 bg-white/80 p-8 backdrop-blur-sm"
        >
          <label className="block text-sm font-medium text-warm-dark mb-2">Password</label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(false) }}
            placeholder="Inserisci password"
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
              error ? 'border-rose-300' : 'border-gold/30 focus:border-gold'
            }`}
            autoFocus
          />
          {error && <p className="text-xs text-rose-500 mt-2">Password non corretta</p>}
          <button type="submit" className="mt-4 w-full rounded-full bg-warm-dark py-3 text-sm font-medium text-cream hover:bg-gold hover:text-warm-dark transition-all duration-200">
            Accedi
          </button>
        </motion.form>
      </motion.div>
    </div>
  )
}

function LeadDrawer({ lead, onClose, onStatusChange }: {
  lead: Lead; onClose: () => void; onStatusChange: (id: string, status: Lead['status']) => void
}) {
  const status = statusConfig[lead.status]
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-warm-dark">Dettagli lead</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={20} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-xs text-muted mb-1">Nome</div>
            <div className="font-medium text-warm-dark">{lead.name}</div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Email</div>
            <a href={`mailto:${lead.email}`} className="text-gold hover:underline text-sm">{lead.email}</a>
          </div>
          {lead.phone && (
            <div>
              <div className="text-xs text-muted mb-1">Telefono</div>
              <a href={`tel:${lead.phone}`} className="text-sm">{lead.phone}</a>
            </div>
          )}
          {lead.weddingDate && (
            <div>
              <div className="text-xs text-muted mb-1">Data matrimonio</div>
              <div className="text-sm">{new Date(lead.weddingDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
          )}
          {lead.message && (
            <div>
              <div className="text-xs text-muted mb-1">Messaggio</div>
              <p className="text-sm text-warm-dark/80 leading-relaxed bg-cream rounded-lg p-3">{lead.message}</p>
            </div>
          )}
          <div>
            <div className="text-xs text-muted mb-1">Data richiesta</div>
            <div className="text-sm">{new Date(lead.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          <div>
            <div className="text-xs text-muted mb-2">Aggiorna stato</div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(statusConfig) as Lead['status'][]).map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(lead.id, s)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    lead.status === s ? statusConfig[s].cls + ' ring-2 ring-gold' : 'bg-gray-50 text-muted hover:bg-gray-100'
                  }`}
                >
                  {lead.status === s && <Check size={10} className="inline mr-1" />}
                  {statusConfig[s].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const refreshLeads = useCallback(() => { setLeads(getLeads()) }, [])

  useEffect(() => {
    if (authed) { seedMockLeads(); refreshLeads() }
  }, [authed, refreshLeads])

  const handleStatusChange = (id: string, status: Lead['status']) => {
    updateLeadStatus(id, status)
    refreshLeads()
    setSelectedLead(prev => prev?.id === id ? { ...prev, status } : prev)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Eliminare questo lead?')) return
    deleteLead(id)
    refreshLeads()
    if (selectedLead?.id === id) setSelectedLead(null)
  }

  const handleLogout = () => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false) }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    lost: leads.filter(l => l.status === 'lost').length,
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2]">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="font-display text-2xl italic font-semibold text-warm-dark">
            inviti<span className="text-gold">.</span>studio
            <span className="text-sm font-sans font-normal text-muted ml-2 not-italic">/ Admin</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted hover:text-warm-dark transition-colors">
            <LogOut size={16} />Esci
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {([['all', 'Tutti'], ['new', 'Nuovi'], ['contacted', 'Contattati'], ['converted', 'Convertiti'], ['lost', 'Persi']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === key ? 'bg-warm-dark text-cream' : 'bg-white text-muted hover:text-warm-dark border border-gray-100'
              }`}
            >
              {label}
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${filter === key ? 'bg-white/20' : 'bg-gray-100'}`}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-medium text-warm-dark">Lead ricevuti</h2>
          </div>
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted text-sm">Nessun lead trovato</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((lead, i) => {
                const s = statusConfig[lead.status]
                return (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-full bg-gold/15 flex items-center justify-center text-sm font-medium text-warm-dark shrink-0">
                      {lead.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-warm-dark truncate">{lead.name}</div>
                      <div className="text-xs text-muted truncate">{lead.email}</div>
                    </div>
                    {lead.weddingDate && (
                      <div className="hidden md:block text-xs text-muted">
                        {new Date(lead.weddingDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}
                    <span className={`text-xs rounded-full px-2.5 py-1 font-medium shrink-0 ${s.cls}`}>{s.label}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedLead(lead)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-muted hover:text-warm-dark">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => handleDelete(lead.id)} className="p-2 hover:bg-rose-50 rounded-lg transition-colors text-muted hover:text-rose-500">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black/20 z-40"
            />
            <LeadDrawer
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
              onStatusChange={handleStatusChange}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

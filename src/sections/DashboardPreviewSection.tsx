import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, Clock, XCircle, Users } from 'lucide-react'
import { useInView, useCountUp } from '@/hooks/useInView'

const statCards = [
  { value: 142, label: 'Invitati totali', icon: Users, color: 'text-zinc-300', bg: 'bg-zinc-800' },
  { value: 98, label: 'Confermati', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { value: 31, label: 'In attesa', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { value: 13, label: 'Declinati', icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
]

const guestRows = [
  { name: 'Sofia Bianchi', table: 'Tavolo 1', status: 'confirmed', guests: 2 },
  { name: 'Marco Rossi', table: 'Tavolo 2', status: 'pending', guests: 1 },
  { name: 'Elena Ferrari', table: 'Tavolo 1', status: 'confirmed', guests: 2 },
  { name: 'Luca Marino', table: 'Tavolo 3', status: 'declined', guests: 1 },
  { name: 'Giulia Conti', table: 'Tavolo 2', status: 'confirmed', guests: 3 },
]

const statusConfig = {
  confirmed: { label: 'Confermato', cls: 'bg-emerald-500/15 text-emerald-400' },
  pending: { label: 'In attesa', cls: 'bg-amber-500/15 text-amber-400' },
  declined: { label: 'Declinato', cls: 'bg-rose-500/15 text-rose-400' },
}

function StatCard({ value, label, icon: Icon, color, bg, inView }: {
  value: number; label: string; icon: React.ElementType; color: string; bg: string; inView: boolean
}) {
  const count = useCountUp(value, 1800, inView)
  return (
    <div className={`rounded-xl ${bg} border border-zinc-800 p-4 flex items-center gap-3`}>
      <div className="p-2 rounded-lg bg-zinc-800">
        <Icon size={16} className={color} />
      </div>
      <div>
        <div className={`text-xl font-bold ${color}`}>{count}</div>
        <div className="text-xs text-zinc-500 font-medium">{label}</div>
      </div>
    </div>
  )
}

export function DashboardPreviewSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const { ref: rowsRef, inView: rowsInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'center center'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1])
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <section className="py-24 md:py-32 bg-zinc-950 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 tracking-wider uppercase mb-4"
          >
            Dashboard
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-semibold text-zinc-50"
          >
            Tutto sotto controllo,
            <br />
            <span className="text-gradient-emerald">sempre</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-base text-zinc-400"
          >
            La nostra dashboard intuitiva ti mostra in un colpo d&apos;occhio lo stato di tutti gli invitati.
          </motion.p>
        </div>

        {/* MacBook scroll effect */}
        <div ref={containerRef} className="mx-auto max-w-5xl" style={{ perspective: '1200px' }}>
          <motion.div
            style={{ scale, rotateX, opacity, y: translateY, transformStyle: 'preserve-3d' }}
            className="origin-bottom"
          >
            {/* MacBook screen frame */}
            <div className="relative rounded-t-2xl bg-zinc-900 border-8 border-zinc-800 shadow-2xl shadow-black/60">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-full bg-zinc-700" />

              {/* Screen content */}
              <div className="overflow-hidden rounded-lg bg-zinc-950" style={{ aspectRatio: '16/10' }}>
                {/* Topbar */}
                <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-zinc-700" />
                      <div className="h-3 w-3 rounded-full bg-zinc-700" />
                      <div className="h-3 w-3 rounded-full bg-zinc-700" />
                    </div>
                    <span className="font-display text-base italic font-semibold text-zinc-100">
                      inviti<span className="text-emerald-400">.</span>studio
                    </span>
                    <span className="text-xs text-zinc-600">/ Sofia & Marco</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-zinc-500">Live</span>
                  </div>
                </div>

                {/* Dashboard body */}
                <div className="p-5 overflow-hidden">
                  {/* Stat cards */}
                  <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {statCards.map((card) => (
                      <StatCard key={card.label} {...card} inView={statsInView} />
                    ))}
                  </div>

                  {/* Guest table */}
                  <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                    <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-zinc-100">Lista ospiti</h3>
                      <span className="text-xs text-zinc-500">142 totali</span>
                    </div>
                    <div ref={rowsRef} className="divide-y divide-zinc-800/60">
                      {guestRows.map((guest, i) => {
                        const st = statusConfig[guest.status as keyof typeof statusConfig]
                        return (
                          <motion.div
                            key={guest.name}
                            initial={{ opacity: 0, x: -16 }}
                            animate={rowsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                            className="flex items-center justify-between px-4 py-2.5"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-7 w-7 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-xs font-medium text-emerald-400">
                                {guest.name[0]}
                              </div>
                              <div>
                                <div className="text-xs font-medium text-zinc-200">{guest.name}</div>
                                <div className="text-xs text-zinc-600">{guest.table} · {guest.guests} {guest.guests === 1 ? 'persona' : 'persone'}</div>
                              </div>
                            </div>
                            <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${st.cls}`}>{st.label}</span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MacBook base */}
            <div className="mx-auto h-3 w-[72%] rounded-b-lg bg-zinc-800 shadow-xl" />
            <div className="mx-auto h-1 w-[86%] rounded-b-xl bg-zinc-900" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

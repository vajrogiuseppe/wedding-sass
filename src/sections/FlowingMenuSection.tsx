import { motion } from 'framer-motion'
import { FlowingMenu } from '@/components/ui/FlowingMenu'

const menuItems = [
  {
    label: 'Inviti Digitali',
    sub: 'Template eleganti, personalizzabili in minuti',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    onClick: () => document.querySelector('#funzionalita')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    label: 'Save the Date',
    sub: 'Annuncia il giorno speciale con stile',
    img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
    onClick: () => document.querySelector('#prezzi')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    label: 'RSVP Smart',
    sub: 'Raccolta conferme automatica e intelligente',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
    onClick: () => document.querySelector('#prezzi')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    label: 'Dashboard Live',
    sub: 'Monitora tutto in tempo reale',
    img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80',
    onClick: () => document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' }),
  },
]

export function FlowingMenuSection() {
  return (
    <section className="py-16 bg-zinc-950 border-t border-b border-zinc-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium text-zinc-600 tracking-widest uppercase"
        >
          Esplora i servizi
        </motion.p>
      </div>
      <FlowingMenu items={menuItems} />
    </section>
  )
}

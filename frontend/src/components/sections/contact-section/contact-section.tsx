'use client'

import { useState, FormEvent } from 'react'
import { PixelInput } from '@/components/ui/pixel-input'
import { PixelButton } from '@/components/ui/pixel-button'
import { SocialLinks } from '@/components/sections/social-links'
import { FloatingSymbols } from './floating-symbols'
import { TypingCat } from './typing-cat'
import { useContact } from '@/hooks/useContact'
import { useFadeIn } from '@/hooks/useFadeIn'
import styles from './contact-section.module.css'

export function ContactSection() {
  const { ref: fadeRef, isVisible } = useFadeIn<HTMLElement>()
  const contact = useContact()

  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    contact.mutate(form, {
      onSuccess: () => setForm({ name: '', email: '', message: '' }),
    })
  }

  return (
    <section
      id="contact"
      ref={fadeRef}
      className={`${styles.contact} fade-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className={styles.header}>
        <p className={styles.label}>get in touch</p>
        <h2 className={styles.title}>let&apos;s build something</h2>
      </div>

      <div className={styles.grid}>
        {/* Formulário à esquerda */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <PixelInput
            label="name"
            name="name"
            placeholder="your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <PixelInput
            label="email"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <PixelInput
            label="message"
            name="message"
            multiline
            placeholder="tell me about your project..."
            value={form.message}
            onChange={handleChange}
            required
          />

          <div className={styles.submit}>
            <PixelButton type="submit" variant="green" disabled={contact.isPending}>
              {contact.isPending ? 'sending...' : 'send message'}
            </PixelButton>
          </div>

          {contact.isSuccess && (
            <p className={styles.success}>message sent! I&apos;ll get back to you soon ✦</p>
          )}
          {contact.isError && (
            <p className={styles.error}>something went wrong. try again or email me directly.</p>
          )}
        </form>

        {/* Gatinho + redes à direita */}
        <div className={styles.side}>
          <div className={styles.catWrap}>
            <FloatingSymbols />
            <TypingCat />
          </div>
          <p className={styles.findMe}>or find me around the web</p>
          <SocialLinks />
          <a href="mailto:brunaszarin@gmail.com" className={styles.email}>
            brunaszarin@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
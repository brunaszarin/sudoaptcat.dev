'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// Componente temporário só pra validar que GSAP + ScrollTrigger estão
// funcionando corretamente no projeto. Pode ser removido depois de testado,
// ou usado como referência de como estruturar futuras animações.
export function GsapDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(boxRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: {
          trigger: boxRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} style={{ padding: '100px 40px' }}>
      <div
        ref={boxRef}
        style={{
          width: 200,
          height: 200,
          background: '#aaff00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          color: '#000',
          fontWeight: 700,
        }}
      >
        gsap funcionando!
      </div>
    </div>
  )
}

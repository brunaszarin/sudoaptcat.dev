import styles from './LogoMarquee.module.css'

interface Logo {
    name: string
    src: string
    scale?: number
}

const LOGOS: Logo[] = [
    { name: 'Serasa Experian', src: '/assets/logos/serasa.png', scale: 1.6 },
    { name: 'Herrlog Solutions', src: '/assets/logos/herrlog.png' , scale: 1.2},
    { name: 'Larroudé', src: '/assets/logos/larroude.png' },
    { name: 'Pag Bank', src: '/assets/logos/pagbank.png', scale: 1.2 },
    { name: 'Inciclo', src: '/assets/logos/inciclo.png' },
    { name: 'Piccola Arte', src: '/assets/logos/piccola.png', scale: 1.4 },
    { name: 'Radial', src: '/assets/logos/radial.png', scale: 1.6 },
    { name: 'ATT', src: '/assets/logos/att.png', scale: 1.4 },
    { name: 'Chloe Gosselin', src: '/assets/logos/chloe.png', scale: 1.8 },
    { name: 'On Pag', src: '/assets/logos/onpag.png' }
]

export function LogoMarquee() {
    return (
        <section className={styles.marquee}>
            <p className={styles.title}>some of the brands I&apos;ve already worked with</p>

            <div className={styles.track}>
                {/* Duplicamos a lista pra criar o loop infinito */}
                <div className={styles.slider}>
                    {[...LOGOS, ...LOGOS].map((logo, i) => (
                        <img
                            key={i}
                            src={logo.src}
                            alt={logo.name}
                            className={styles.logo}
                            title={logo.name}
                            style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
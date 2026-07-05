import type { Experience } from '@/data/experiences'
import styles from './CompanyCard.module.css'

interface CompanyCardProps {
  experience: Experience
}

export function CompanyCard({ experience }: CompanyCardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.border} ${styles.clip}`} />
      <div className={`${styles.fill} ${styles.clip}`} />
      <div className={styles.content}>
        <h3 className={styles.company}>{experience.company}</h3>
        <p className={styles.role}>{experience.role}</p>
        <p className={styles.period}>
          {experience.period} · {experience.location}
        </p>
        <p className={styles.description}>{experience.description}</p>
        <div className={styles.techs}>
          {experience.technologies.map((tech) => (
            <span key={tech} className={styles.tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
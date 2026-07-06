import styles from './CompanyHouse.module.css'

/**
 * Casinha de pixel art detalhada: telhado com chaminé + fumaça,
 * janelas com moldura, floreiras com flores, porta e arbustos.
 * Desenhada num viewBox 64x64.
 */
export function CompanyHouse() {
  return (
    <svg
      className={styles.house}
      viewBox="0 0 64 64"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Fumaça animada */}
      <g fill="#66aa00">
        <rect className={styles.s1} x="41" y="2" width="3" height="3" />
        <rect className={styles.s2} x="42" y="0" width="2" height="2" />
        <rect className={styles.s3} x="41" y="3" width="2" height="2" />
      </g>

      {/* Chaminé */}
      <rect x="39" y="6" width="8" height="2" fill="#2f5d00" />
      <rect x="40" y="8" width="6" height="12" fill="#3b6d11" />
      <rect x="40" y="8" width="6" height="2" fill="#4d7200" />
      <rect x="40" y="12" width="6" height="1" fill="#2f5d00" />
      <rect x="40" y="16" width="6" height="1" fill="#2f5d00" />

      {/* Telhado (por cima da base da chaminé) */}
      <rect x="30" y="8" width="4" height="3" fill="#2f5d00" />
      <rect x="27" y="11" width="10" height="3" fill="#2f5d00" />
      <rect x="24" y="14" width="16" height="3" fill="#2f5d00" />
      <rect x="21" y="17" width="22" height="3" fill="#2f5d00" />
      <rect x="18" y="20" width="30" height="3" fill="#2f5d00" />
      <rect x="15" y="23" width="34" height="3" fill="#2f5d00" />
      <rect x="12" y="26" width="40" height="4" fill="#2f5d00" />
      <rect x="30" y="11" width="4" height="3" fill="#4d7200" />
      <rect x="27" y="14" width="10" height="3" fill="#4d7200" />
      <rect x="24" y="17" width="13" height="3" fill="#4d7200" />
      <rect x="21" y="20" width="18" height="3" fill="#4d7200" />
      <rect x="18" y="23" width="24" height="3" fill="#4d7200" />

      {/* Frontão + janelinha do sótão */}
      <rect x="26" y="20" width="12" height="6" fill="#66aa00" />
      <rect x="29" y="17" width="6" height="3" fill="#66aa00" />
      <rect x="30" y="21" width="4" height="4" fill="#aaff00" />
      <rect x="31" y="21" width="1" height="4" fill="#2f5d00" />

      {/* Corpo */}
      <rect x="14" y="30" width="36" height="28" fill="#7bc400" />
      <rect x="46" y="30" width="4" height="28" fill="#66aa00" />
      <rect x="14" y="30" width="3" height="28" fill="#88cc00" />

      {/* Janela superior + floreira com flores */}
      <rect x="26" y="34" width="12" height="9" fill="#3b6d11" />
      <rect x="27" y="35" width="10" height="7" fill="#aaff00" />
      <rect x="31" y="35" width="2" height="7" fill="#3b6d11" />
      <rect x="27" y="38" width="10" height="1" fill="#3b6d11" />
      <rect x="25" y="43" width="14" height="3" fill="#4d7200" />
      <rect x="26" y="41" width="2" height="2" fill="#3b6d11" />
      <rect x="29" y="41" width="2" height="2" fill="#3b6d11" />
      <rect x="32" y="41" width="2" height="2" fill="#3b6d11" />
      <rect x="35" y="41" width="2" height="2" fill="#3b6d11" />
      <rect x="26" y="40" width="2" height="1" fill="#ff6b9d" />
      <rect x="29" y="40" width="2" height="1" fill="#ffe14d" />
      <rect x="32" y="40" width="2" height="1" fill="#ff6b9d" />
      <rect x="35" y="40" width="2" height="1" fill="#ffe14d" />

      {/* Porta */}
      <rect x="18" y="46" width="10" height="3" fill="#4d7200" />
      <rect x="19" y="49" width="8" height="9" fill="#2f5d00" />
      <rect x="20" y="50" width="6" height="7" fill="#3b6d11" />
      <rect x="24" y="53" width="1" height="1" fill="#aaff00" />

      {/* Janela inferior */}
      <rect x="34" y="48" width="10" height="8" fill="#3b6d11" />
      <rect x="35" y="49" width="8" height="6" fill="#aaff00" />
      <rect x="38" y="49" width="2" height="6" fill="#3b6d11" />
      <rect x="35" y="51" width="8" height="1" fill="#3b6d11" />

      {/* Base */}
      <rect x="12" y="58" width="40" height="4" fill="#2f5d00" />

      {/* Arbustos com flores */}
      <rect x="10" y="52" width="8" height="6" fill="#3b6d11" />
      <rect x="11" y="50" width="6" height="3" fill="#4d7200" />
      <rect x="12" y="50" width="1" height="1" fill="#ff6b9d" />
      <rect x="15" y="51" width="1" height="1" fill="#ffe14d" />
      <rect x="44" y="52" width="10" height="6" fill="#3b6d11" />
      <rect x="45" y="50" width="8" height="3" fill="#4d7200" />
      <rect x="47" y="50" width="1" height="1" fill="#ffe14d" />
      <rect x="50" y="50" width="1" height="1" fill="#ff6b9d" />
    </svg>
  )
}
function CelebrationOverlay({ show, message = 'Loan amount applied!', amountLabel = '' }) {
  if (!show) return null

  const colors = ['#0b254a', '#b5873e', '#16a34a', '#f59e0b']
  const pieces = Array.from({ length: 24 }, (_, index) => index)

  return (
    <div className="celebration-overlay" aria-live="polite">
      <div className="celebration-backdrop" />
      <div className="celebration-confetti-wrap">
        {pieces.map((index) => (
          <span
            key={index}
            className="celebration-confetti"
            style={{
              left: `${(index * 17) % 100}%`,
              animationDelay: `${(index % 8) * 0.06}s`,
              backgroundColor: colors[index % colors.length],
            }}
          />
        ))}
      </div>
      <div className="celebration-center">
        <div className="celebration-card">
          <div className="celebration-icon-ring">
            <span className="celebration-emoji" aria-hidden="true">
              ✓
            </span>
          </div>
          <p className="celebration-title">{message}</p>
          {amountLabel ? <p className="celebration-amount">{amountLabel}</p> : null}
          <p className="celebration-subtitle">You can accept your offer now</p>
        </div>
      </div>
    </div>
  )
}

export default CelebrationOverlay

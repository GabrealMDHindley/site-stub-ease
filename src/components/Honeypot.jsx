// Hidden spam trap. Real visitors never see or reach this field (it's off-screen,
// aria-hidden and out of the tab order); bots that fill every input do. The
// server functions (/api/lead, /api/reviews) silently drop any submission where
// `hp` is non-empty.
export default function Honeypot({ value, onChange }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      style={{ left: '-10000px', top: 'auto' }}
    >
      <label>
        Leave this field empty
        <input
          type="text"
          name="hp"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}

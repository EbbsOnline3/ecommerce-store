
export default function Button({text, styles={}, onClick}) {
  return (
    <button style={styles} className="comp-btn" onClick={onClick} >
      {text}
    </button>
  )
}

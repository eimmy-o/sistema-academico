import "./styles.css"
export const MessageError = ({error}) => {
  if (!error) return null;

  return (
    <div className="error-container">
      <p> {error} </p>
    </div>
  )
}

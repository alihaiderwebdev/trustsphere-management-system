function Card({ children, className = "" }) {
  return (
    <div className={`card border-0 shadow-sm h-100 ${className}`}>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

export default Card;

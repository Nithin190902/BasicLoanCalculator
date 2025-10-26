import { useLoanStore } from "../store/useLoanStore";

export default function BulletsList() {
  const { bullets, updateBullet, removeBullet } = useLoanStore();

  if (!bullets.length) return (
    <div className="card">
      <h4>Bullets</h4>
      <div style={{color:'#666'}}>No bullets added.</div>
    </div>
  );

  return (
    <div className="card">
      <h4>Bullets</h4>
      {bullets.sort((a,b)=>a.month-b.month).map(b => (
        <div key={b.id} className="bullet-row">
          <div style={{flex:1}}>
            <div style={{fontSize:13,color:'#444'}}>Month <strong>{b.month}</strong></div>
            <div style={{fontSize:13,color:'#444'}}>Amount ₹<strong>{b.amount}</strong></div>
          </div>
          <div style={{display:'flex',gap:6}}>
            <button className="small-btn" onClick={()=> {
              const newMonth = Math.max(1, b.month - 1);
              updateBullet(b.id, newMonth, b.amount);
            }}>-M</button>
            <button className="small-btn" onClick={()=> {
              updateBullet(b.id, b.month + 1, b.amount);
            }}>+M</button>
            <button className="small-btn" onClick={()=> removeBullet(b.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

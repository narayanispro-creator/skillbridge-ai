export function SparkBars({values}:{values:number[]}){return <div className="sparkBars">{values.map((v,i)=><i key={i} style={{height:`${Math.max(12,Math.min(100,v))}%`}}/>)}</div>}

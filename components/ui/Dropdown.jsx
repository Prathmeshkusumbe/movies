export function DropDownList({data}){
  //console.log('data', data)
  return (
    <div className="rounded bg-white inline-block text-black  ">
    {data.map((s,i)=>

      <div key={i} className="pt-1 pb-1 pl-4 pr-4 border-b border-slate-400" onClick={s.action}>{s.label}</div>

    )}
    </div>
  )

}
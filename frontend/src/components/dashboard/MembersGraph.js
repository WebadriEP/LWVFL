import { AreaChart, Area, Tooltip, YAxis, XAxis, ResponsiveContainer } from 'recharts';

const data = [
  {month: 'July', members: 128, amt: 1000},
  {month: 'August', members: 378, amt: 1000},
  {month: 'September', members: 200, amt: 1000},
  {month: 'October', members: 278, amt: 1000},
  {month: 'November', members: 189, amt: 1000}
]

/* 
  The graph uses Recharts
  It's in a responsive container provided by the library
*/

const MembersGraph = () => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart width={200} height={60} data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0, }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="members" stroke="#595959" fill="#a9a9a9"/>
        
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default MembersGraph
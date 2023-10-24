'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";

const Data = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    const fetchData = async () => {
        const res = await fetch("database/onr-duality");//
        const sdata = await res.json(); 
console.log( typeof sdata);
console.log(sdata);
const data = JSON.parse(sdata);
console.log( typeof data);
console.log(data);
        setData(data);
    }

    useEffect(() => {        
        fetchData();     
    },[]);

return(
<div className="overflow-x-auto">
  Oracle Knowledge Graph
  <br></br>
  <br></br>
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th> 
        <th>empno</th> 
        <th>ename</th> 
        <th>job</th> 
        <th>mgr</th> 
        <th>hiredate</th> 
        <th>sal</th>
        <th>comm</th>
        <th>deptno</th>
        <th>dname</th>
      </tr>
    </thead> 
    <tbody>
{data.map((row) => (
      <tr>
        <th>{row.id}</th> 
        <td>{row.empno}</td> 
        <td>{row.ename}</td> 
        <td>{row.job}</td> 
        <td>{row.mgr}</td> 
        <td>{row.hiredate}</td> 
        <td>{row.sal}</td> 
        <td>{row.comm}</td> 
        <td>{row.deptno}</td> 
        <td>{row.dname}</td> 
      </tr>
))}
    </tbody> 
  </table>
  <br></br>
  
</div>
)
}

export default Data;

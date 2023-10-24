'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";
import { Button } from "@/components/ui/button"
import setup from "./details/setup.js"
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"

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
  Oracle Machine Learning (OML)
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

  <Collapsible>
        <CollapsibleTrigger>Video Instructions</CollapsibleTrigger>
        <CollapsibleContent>
            <div className='player-wrapper'>
                <ReactPlayer
                className='react-player fixed-bottom'
                url= 'videos/onr-sql-video.mp4'
                width="690px" 
                height="390px"
                controls = {true}
                />
            </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger>Setup</CollapsibleTrigger>
        <CollapsibleContent>
            <pre style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: JSON.stringify(setup).replace(/"/g, "") }}></pre>
        </CollapsibleContent>
      </Collapsible>
  Hi Phil, you'll find a variety of examples in the Oracle Machine Learning Github: https://github.com/oracle-samples/oracle-db-examples/tree/main/machine-learning
11:23
  <br></br>
The folders are aggregated by product R/Python/SQL
  <br></br>
Install OML4Py on-premises client:
  <br></br>
https://docs.oracle.com/en/database/oracle/machine-learning/oml4py/1/mlpug/install-oml4py-client-premises-database.html#GUID-F1FD49FC-040E-400B-942E-7261427EA6EA
7:57
  <br></br>
Install OML4Py universal client (connect to ADB or ODB from same installation): https://blogs.oracle.com/machinelearning/post/getting-started-with-the-oml4py-universal-client

</div>
)
}

export default Data;

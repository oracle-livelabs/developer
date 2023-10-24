'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import post from "./details/post.js"
import get from "./details/get.js"
import ReactPlayer from "react-player/lazy";

const Data = () => {
  
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    function refresh() {
      window.location.href = "onr-pgq"
    }

    const doPOST = async () => {
      const resp = await fetch("database/onr-pgq", { method: 'POST'} );
      refresh()
      setData(data);
    }

    const fetchData = async () => {
      const res = await fetch("database/onr-pgq", { method: 'GET'} );
      const sdata = await res.json(); 
      const data = JSON.parse(sdata);
      setData(data);
    }

    const fetchData2 = async () => {
      const res = await fetch("database/onr-pgq", { method: 'GET2'} );
      const sdata = await res.json(); 
      const data = JSON.parse(sdata);
      setData(data);
    }

    useEffect(() => {        
        fetchData();          
        fetchData2();   
    },[]);

    return(
    <div className="overflow-x-auto">
      Basic SQL and Upsert Views
      <br></br>
      <button className="btn btn-info" onClick={doPOST}>POST - Build tables and Views using POST code below</button>
      <button className="btn btn-success" onClick={refresh}>GET - Query empdept using GET code below</button>
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
            <th>loc</th>
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
            <td>{row.loc}</td> 
          </tr>
    ))}
        </tbody> 
      </table>
      <br></br>
      <br></br>

          <details className="collapse bg-base-00">
            <summary className="collapse-title text-xl font-medium">Video Instructions</summary>
            <div className="collapse-content"> 
            <div className='player-wrapper'>
                <ReactPlayer
                className='react-player fixed-bottom'
                url= 'videos/onr-sql-video.mp4'
                width="690px" 
                height="390px"
                controls = {true}
                />
            </div>
            </div>
          </details>

          <details className="collapse bg-base-00">
            <summary className="collapse-title text-xl font-medium">POST Code</summary>
            <div className="collapse-content"> 
              <pre style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: JSON.stringify(post).replace(/\\/g, "") }}></pre>
            </div>
          </details>

          <details className="collapse bg-base-00">
            <summary className="collapse-title text-xl font-medium">GET Code</summary>
            <div className="collapse-content"> 
              <pre style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: JSON.stringify(get).replace(/"/g, "") }}></pre>
            </div>
          </details>

        </div>
    )
}

export default Data;

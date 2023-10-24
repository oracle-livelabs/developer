'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import post from "./details/post.js"
import get from "./details/get.js"
import put from "./details/put.js"
import deletes from "../onr-sql/details/delete.js"
import ReactPlayer from "react-player/lazy";
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"

const Data = () => {
  
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    function refresh() {
      window.location.href = "onr-duality"
    }

    const doPOST = async () => {
      const resp = await fetch("database/onr-duality", { method: 'POST'} );
      refresh()
      setData(data);
    }

    const doPUT = async () => {
      const resp = await fetch("database/onr-duality", { method: 'PUT'} );
      refresh()
      setData(data);
    }

    const doDELETE = async () => {
      const resp = await fetch("database/onr-sql", { method: 'DELETE'} );
      refresh()
      setData(data);
    }

    const fetchData = async () => {
      const res = await fetch("database/onr-duality", { method: 'GET'} );
      const sdata = await res.json(); 
      const data = JSON.parse(sdata);
      setData(data);
    }

    useEffect(() => {        
        fetchData();     
    },[]);

    return(
    <div className="overflow-x-auto">
      Basic SQL and Upsert Views
      <br></br>
      <Button variant="secondary" onClick={doPOST}>POST - Build tables and Views using POST code below</Button> &nbsp;&nbsp;&nbsp;
      <Button variant="outline" onClick={refresh}>GET - Query emp_dept_upsert_view using GET code below</Button> &nbsp;&nbsp;&nbsp;
      <Button variant="secondary">Insert row</Button> &nbsp;&nbsp;&nbsp;
      <Button variant="secondary">Update row</Button> &nbsp;&nbsp;&nbsp;
      <Button variant="secondary">Delete row</Button> &nbsp;&nbsp;&nbsp;
      <Button variant="secondary" onClick={doPUT}>PUT - Update SMITH to SMITHie using PUT code below</Button> &nbsp;&nbsp;&nbsp;
      <Button variant="destructive" onClick={doDELETE}>DELETE - Delete all rows using DELETE code below</Button>
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

        <Collapsible>
          <CollapsibleTrigger>POST Code</CollapsibleTrigger>
          <CollapsibleContent>
                      <pre style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: JSON.stringify(post).replace(/\\/g, "") }}></pre>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger>GET Code</CollapsibleTrigger>
          <CollapsibleContent>
                      <pre style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: JSON.stringify(get).replace(/\\/g, "") }}></pre>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger>PUT Code</CollapsibleTrigger>
          <CollapsibleContent>
                    <pre style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: JSON.stringify(put).replace(/\\/g, "") }}></pre>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger>DELETE Code</CollapsibleTrigger>
          <CollapsibleContent>
                    <pre style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: JSON.stringify(deletes).replace(/\\/g, "") }}></pre>
          </CollapsibleContent>
        </Collapsible>
        <br></br>
        <Link href="https://docs.oracle.com/en/database/oracle/oracle-database/23/jsnvu/overview-json-relational-duality-views.html#GUID-CE7227BF-B4AF-4024-A578-ED52795F4525">Documentation</Link>

        </div>
    )
}

export default Data;

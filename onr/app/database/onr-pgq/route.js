import { NextResponse } from 'next/server';
import oracledb from "oracledb"

export async function POST(req) {
  let connection;

  let sql = [
    `create or replace property graph empdept
    vertex tables (
        emp key(empno) label emp properties (
            empno,
            ename,
            job,
            mgr,
            hiredate,
            sal,
            comm,
            deptno
        ),
        dept key(deptno) label dept properties (
            deptno,
            dname,
            loc
        )
    )
    EDGE TABLES (
        emp AS works_at 
        SOURCE KEY ( empno ) REFERENCES emp (empno)
        DESTINATION KEY (deptno) REFERENCES dept (deptno)
    , 
        emp AS manager 
        SOURCE KEY ( empno ) REFERENCES emp (empno)
        DESTINATION KEY (empno) REFERENCES emp (mgr)
    )`
]

   try {
     console.log('Trying connection for POST.');
     connection = await oracledb.getConnection(JSON.parse(process.env.dbConfig));
     console.log('Connection was successful for POST!');

     sql.forEach(async (s) => await connection.execute(s));
   } catch (err) {
    
   } finally {
     if (connection) {
       try {
         await connection.close();
       } catch (err) {
         console.error(err);
       }
     }
   }
   console.log('POST PGQ Code Succeeded.');
  }

  export async function GET(req) {

    let connection;
    
        try {
          console.log('Trying connection for GET.');
          //oracledb.initOracleClient();
          connection = await oracledb.getConnection(JSON.parse(process.env.dbConfig));
          console.log('Connection was successful for GET!');
          var sql = "select json_object(\
            'id' value rownum,\
            'empno' value empno,\
            'ename' value ename,\
            'job' value job,\
            'sal' value sal,\
            'comm' value comm,\
            'deptno' value deptno,\
            'dname' value dname,\
            'loc' value loc\
          ) from (SELECT * FROM GRAPH_TABLE (empdept MATCH (e)-[is works_at]->(d) COLUMNS (e.empno, e.ename, e.job, e.mgr, e.hiredate, e.sal, e.comm, d.dname, d.deptno, d.loc)))"
    
          const result = await connection.execute(sql);
          var str = '[' + result.rows + ']'
          console.log(str)
          //return str
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
        }

    console.log('GET of pgq empdept called');
    return NextResponse.json(str);
}
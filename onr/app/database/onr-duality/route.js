import { NextResponse } from 'next/server';
import oracledb from "oracledb"

export async function POST(req) {
  let connection;

  let sql = [
    `create or replace json relational duality view dept_emp
    as
    select json { 'deptno':d.deptno,
                  'dname':d.dname,
                  'loc':d.loc,
                  'empDetails': [
                      select json { 'empno'       : e.empno,
                                    'ename'       : e.ename,
                                    'job'         : e.job,
                                    'mgr'         : e.mgr,
                                    'hiredate'    : e.hiredate,
                                    'sal'         : e.sal,
                                    'comm'        : e.comm }
                     from emp e with insert update delete
                     where e.deptno = d.deptno ]
             }
          from dept d with insert update delete
    `,
       
    `insert into dept_emp values('{"deptno":40,"dname":"ACCOUNTING","loc":"NEW YORK","empDetails":[]}')`,
    `insert into dept_emp values('{"deptno":20,"dname":"RESEARCH","loc":"DALLAS","empDetails":[{"empno":7369,"ename":"SMITH","job":"CLERK","mgr":7902,"hiredate":"1980-12-17T00:00:00","sal":800,"comm":null},{"empno":7566,"ename":"JONES","job":"MANAGER","mgr":7839,"hiredate":"1981-04-02T00:00:00","sal":2975,"comm":null},{"empno":7788,"ename":"SCOTT","job":"ANALYST","mgr":7566,"hiredate":"1982-12-09T00:00:00","sal":3000,"comm":null},{"empno":7876,"ename":"ADAMS","job":"CLERK","mgr":7788,"hiredate":"1983-01-12T00:00:00","sal":1100,"comm":null},{"empno":7902,"ename":"FORD","job":"ANALYST","mgr":7566,"hiredate":"1981-12-03T00:00:00","sal":3000,"comm":null}]}')`,
    `insert into dept_emp values('{"deptno":30,"dname":"SALES","loc":"CHICAGO","empDetails":[{"empno":7499,"ename":"ALLEN","job":"SALESMAN","mgr":7698,"hiredate":"1981-02-20T00:00:00","sal":1600,"comm":300},{"empno":7521,"ename":"WARD","job":"SALESMAN","mgr":7698,"hiredate":"1981-02-22T00:00:00","sal":1250,"comm":500},{"empno":7654,"ename":"MARTIN","job":"SALESMAN","mgr":7698,"hiredate":"1981-09-28T00:00:00","sal":1250,"comm":1400},{"empno":7698,"ename":"BLAKE","job":"MANAGER","mgr":7839,"hiredate":"1981-05-01T00:00:00","sal":2850,"comm":null},{"empno":7844,"ename":"TURNER","job":"SALESMAN","mgr":7698,"hiredate":"1981-09-08T00:00:00","sal":1500,"comm":null},{"empno":7900,"ename":"JAMES","job":"CLERK","mgr":7698,"hiredate":"1981-12-03T00:00:00","sal":950,"comm":null}]}')`,
    `insert into dept_emp values('{"deptno":10,"dname":"ACCOUNTING","loc":"NEW YORK","empDetails":[{"empno":7782,"ename":"CLARK","job":"MANAGER","mgr":7839,"hiredate":"1981-06-09T00:00:00","sal":2450,"comm":null},{"empno":7839,"ename":"KING","job":"PRESIDENT","mgr":null,"hiredate":"1981-11-17T00:00:00","sal":5000,"comm":null},{"empno":7934,"ename":"MILLER","job":"CLERK","mgr":7782,"hiredate":"1982-01-23T00:00:00","sal":1300,"comm":null}]}')`,
       
    `insert into dept_emp values('{"deptno":40,"dname":"ACCOUNTING","loc":"NEW YORK","empDetails":[]}')`,
    `insert into dept_emp values('{"deptno":20,"dname":"RESEARCH","loc":"DALLAS","empDetails":[{"empno":7369,"ename":"SMITHie","job":"CLERK","mgr":7902,"hiredate":"1980-12-17T00:00:00","sal":800,"comm":null},{"empno":7566,"ename":"JONES","job":"MANAGER","mgr":7839,"hiredate":"1981-04-02T00:00:00","sal":2975,"comm":null},{"empno":7788,"ename":"SCOTT","job":"ANALYST","mgr":7566,"hiredate":"1982-12-09T00:00:00","sal":3000,"comm":null},{"empno":7876,"ename":"ADAMS","job":"CLERK","mgr":7788,"hiredate":"1983-01-12T00:00:00","sal":1100,"comm":null},{"empno":7902,"ename":"FORD","job":"ANALYST","mgr":7566,"hiredate":"1981-12-03T00:00:00","sal":3000,"comm":null}]}')`,
    `insert into dept_emp values('{"deptno":30,"dname":"SALES","loc":"CHICAGO","empDetails":[{"empno":7499,"ename":"ALLEN","job":"SALESMAN","mgr":7698,"hiredate":"1981-02-20T00:00:00","sal":1600,"comm":300},{"empno":7521,"ename":"WARD","job":"SALESMAN","mgr":7698,"hiredate":"1981-02-22T00:00:00","sal":1250,"comm":500},{"empno":7654,"ename":"MARTIN","job":"SALESMAN","mgr":7698,"hiredate":"1981-09-28T00:00:00","sal":1250,"comm":1400},{"empno":7698,"ename":"BLAKE","job":"MANAGER","mgr":7839,"hiredate":"1981-05-01T00:00:00","sal":2850,"comm":null},{"empno":7844,"ename":"TURNER","job":"SALESMAN","mgr":7698,"hiredate":"1981-09-08T00:00:00","sal":1500,"comm":null},{"empno":7900,"ename":"JAMES","job":"CLERK","mgr":7698,"hiredate":"1981-12-03T00:00:00","sal":950,"comm":null}]}')`,
    `insert into dept_emp values('{"deptno":10,"dname":"ACCOUNTING","loc":"NEW YORK","empDetails":[{"empno":7782,"ename":"CLARK","job":"MANAGER","mgr":7839,"hiredate":"1981-06-09T00:00:00","sal":2450,"comm":null},{"empno":7839,"ename":"KING","job":"PRESIDENT","mgr":null,"hiredate":"1981-11-17T00:00:00","sal":5000,"comm":null},{"empno":7934,"ename":"MILLER","job":"CLERK","mgr":7782,"hiredate":"1982-01-23T00:00:00","sal":1300,"comm":null}]}')`,
   `commit`
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
   console.log('POST Code Succeeded.');
  }

  export async function PUT(req) {
    let connection;
  
    let sql = [
      `update dept_emp d set data = '{"deptno":20,"dname":"RESEARCH","loc":"DALLAS","empDetails":
      [{"empno":7369,"ename":"SMITHie","job":"CLERK","mgr":7902,"hiredate":"1980-12-17T00:00:00","sal":800,"comm":null}]}'
      where d.data.deptno = 20`,
      `commit`
  ]
  
     try {
       console.log('Trying connection for PUT.');
       connection = await oracledb.getConnection(JSON.parse(process.env.dbConfig));
       console.log('Connection was successful for PUT!');
  
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
     console.log('PUT Code Succeeded.');
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
                          'mgr' value mgr,\
                          'hiredate' value hiredate,\
                          'sal' value sal,\
                          'comm' value comm,\
                          'deptno' value deptno,\
                          'dname' value dname,\
                          'loc' value loc\
                       ) from emp_dept_upsert_view"
      
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
  
      console.log('GET emp_dept_upsert_view called');
      return NextResponse.json(str);
  }
const viewInserts = `
select json_object(
  'id' value rownum,
  'empno' value empno,
  'ename' value ename,
  'job' value job,
  'mgr' value mgr,
  'hiredate' value hiredate,
  'sal' value sal,
  'comm' value comm,
  'deptno' value deptno,
  'dname' value dname,
  'loc' value loc
) from emp_dept_upsert_view
 
Why doesn't this work?
 
select json_object(
  --'id' value d.data.rownum,
  'empno' value d.data.empno,
  'ename' value d.data.ename,
  'job' value d.data.job,
  'mgr' value d.data.mgr,
  'hiredate' value d.data.hiredate,
  'sal' value d.data.sal,
  'comm' value d.data.comm,
  'deptno' value d.data.deptno,
  'dname' value d.data.dname,
  'loc' value d.data.loc
) from dept_emp d;
 
I get:
{"empno":null,"ename":null,"job":null,"mgr":null,"hiredate":null,"sal":null,"comm":null,"deptno":40,"dname":"ACCOUNTING","loc":"NEW YORK"}
{"empno":null,"ename":null,"job":null,"mgr":null,"hiredate":null,"sal":null,"comm":null,"deptno":20,"dname":"RESEARCH","loc":"DALLAS"}
{"empno":null,"ename":null,"job":null,"mgr":null,"hiredate":null,"sal":null,"comm":null,"deptno":30,"dname":"SALES","loc":"CHICAGO"}
{"empno":null,"ename":null,"job":null,"mgr":null,"hiredate":null,"sal":null,"comm":null,"deptno":10,"dname":"ACCOUNTING","loc":"NEW YORK"}
 
How can I get them like this:
{"deptno":20,"dname":"RESEARCH","loc":"DALLAS","empDetails":[{"empno":7369,"ename":"SMITHie","job":"CLERK","mgr":7902,"hiredate":"1980-12-17T00:00:00","sal":800,"comm":null}]}
 
`.replace(/\n/g, "<br>")
 

  export default viewInserts;
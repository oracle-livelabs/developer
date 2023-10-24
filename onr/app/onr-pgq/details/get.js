const view = `
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
  ) from (SELECT * FROM GRAPH_TABLE (empdept MATCH (e)-[is works_at]->(d) COLUMNS (e.empno, e.ename, e.job, e.mgr, e.hiredate, e.sal, e.comm, d.dname, d.deptno, d.loc)));
   
The equivalent sql is:
select e.empno, e.ename, e.sal, d.dname, d.deptno, d.loc from emp e join dept d on e.deptno = d.deptno order by 2;
`.replace(/\n/g, "<br>")

export default view;
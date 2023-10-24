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
`.replace(/\n/g, "<br>")

  export default viewInserts;
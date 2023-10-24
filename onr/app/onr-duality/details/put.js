const viewInserts = `
update dept_emp d set data = '{"deptno":20,"dname":"RESEARCH","loc":"DALLAS","empDetails":[{"empno":7369,"ename":"SMITHie","job":"CLERK","mgr":7902,"hiredate":"1980-12-17T00:00:00","sal":800,"comm":null}]}'
where d.data.deptno = 20;
`.replace(/\n/g, "<br>")
export default viewInserts;
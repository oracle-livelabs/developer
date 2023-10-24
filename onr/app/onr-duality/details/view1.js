const view = `
create or replace json relational duality view emp_dept
 as
 select json { 'empno'       : e.empno,
               'ename'       : e.ename,
                'job'         : e.job,
                'mgr'         : e.mgr,
                'hiredate'    : e.hiredate,
                'sal'         : e.sal,
                'comm'        : e.comm,
                'deptno'      : ( select json {'deptno':d.deptno,
                                               'dname':d.dname,'loc': d.loc}
                                  from dept d with update 
                                  where e.deptno = d.deptno )
     }
  from emp e with insert update delete
  ;
  select * from emp_dept;
`.replace(/\n/g, "<br>")

export default view;
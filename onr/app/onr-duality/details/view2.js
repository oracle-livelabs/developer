const view = `create or replace json relational duality view dept_emp
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
;
select * from dept_emp;
`.replace(/\n/g, "<br>")

export default view;
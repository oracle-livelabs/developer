const view = `
create or replace json relational duality view dept_emp
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
   
  set define off;
  insert into dept_emp values('{"deptno":40,"dname":"ACCOUNTING","loc":"NEW YORK","empDetails":[]}');
  insert into dept_emp values('{"deptno":20,"dname":"RESEARCH","loc":"DALLAS","empDetails":[{"empno":7369,"ename":"SMITH","job":"CLERK","mgr":7902,"hiredate":"1980-12-17T00:00:00","sal":800,"comm":null},{"empno":7566,"ename":"JONES","job":"MANAGER","mgr":7839,"hiredate":"1981-04-02T00:00:00","sal":2975,"comm":null},{"empno":7788,"ename":"SCOTT","job":"ANALYST","mgr":7566,"hiredate":"1982-12-09T00:00:00","sal":3000,"comm":null},{"empno":7876,"ename":"ADAMS","job":"CLERK","mgr":7788,"hiredate":"1983-01-12T00:00:00","sal":1100,"comm":null},{"empno":7902,"ename":"FORD","job":"ANALYST","mgr":7566,"hiredate":"1981-12-03T00:00:00","sal":3000,"comm":null}]}');
  insert into dept_emp values('{"deptno":30,"dname":"SALES","loc":"CHICAGO","empDetails":[{"empno":7499,"ename":"ALLEN","job":"SALESMAN","mgr":7698,"hiredate":"1981-02-20T00:00:00","sal":1600,"comm":300},{"empno":7521,"ename":"WARD","job":"SALESMAN","mgr":7698,"hiredate":"1981-02-22T00:00:00","sal":1250,"comm":500},{"empno":7654,"ename":"MARTIN","job":"SALESMAN","mgr":7698,"hiredate":"1981-09-28T00:00:00","sal":1250,"comm":1400},{"empno":7698,"ename":"BLAKE","job":"MANAGER","mgr":7839,"hiredate":"1981-05-01T00:00:00","sal":2850,"comm":null},{"empno":7844,"ename":"TURNER","job":"SALESMAN","mgr":7698,"hiredate":"1981-09-08T00:00:00","sal":1500,"comm":null},{"empno":7900,"ename":"JAMES","job":"CLERK","mgr":7698,"hiredate":"1981-12-03T00:00:00","sal":950,"comm":null}]}');
  insert into dept_emp values('{"deptno":10,"dname":"ACCOUNTING","loc":"NEW YORK","empDetails":[{"empno":7782,"ename":"CLARK","job":"MANAGER","mgr":7839,"hiredate":"1981-06-09T00:00:00","sal":2450,"comm":null},{"empno":7839,"ename":"KING","job":"PRESIDENT","mgr":null,"hiredate":"1981-11-17T00:00:00","sal":5000,"comm":null},{"empno":7934,"ename":"MILLER","job":"CLERK","mgr":7782,"hiredate":"1982-01-23T00:00:00","sal":1300,"comm":null}]}');
  
  -- Unfortunatey, the following duplicate inserts cause errors, unlike the inserts into an upsert view.
  insert into dept_emp values('{"deptno":40,"dname":"ACCOUNTING","loc":"NEW YORK","empDetails":[]}');
  insert into dept_emp values('{"deptno":20,"dname":"RESEARCH","loc":"DALLAS","empDetails":[{"empno":7369,"ename":"SMITHie","job":"CLERK","mgr":7902,"hiredate":"1980-12-17T00:00:00","sal":800,"comm":null},{"empno":7566,"ename":"JONES","job":"MANAGER","mgr":7839,"hiredate":"1981-04-02T00:00:00","sal":2975,"comm":null},{"empno":7788,"ename":"SCOTT","job":"ANALYST","mgr":7566,"hiredate":"1982-12-09T00:00:00","sal":3000,"comm":null},{"empno":7876,"ename":"ADAMS","job":"CLERK","mgr":7788,"hiredate":"1983-01-12T00:00:00","sal":1100,"comm":null},{"empno":7902,"ename":"FORD","job":"ANALYST","mgr":7566,"hiredate":"1981-12-03T00:00:00","sal":3000,"comm":null}]}');
  insert into dept_emp values('{"deptno":30,"dname":"SALES","loc":"CHICAGO","empDetails":[{"empno":7499,"ename":"ALLEN","job":"SALESMAN","mgr":7698,"hiredate":"1981-02-20T00:00:00","sal":1600,"comm":300},{"empno":7521,"ename":"WARD","job":"SALESMAN","mgr":7698,"hiredate":"1981-02-22T00:00:00","sal":1250,"comm":500},{"empno":7654,"ename":"MARTIN","job":"SALESMAN","mgr":7698,"hiredate":"1981-09-28T00:00:00","sal":1250,"comm":1400},{"empno":7698,"ename":"BLAKE","job":"MANAGER","mgr":7839,"hiredate":"1981-05-01T00:00:00","sal":2850,"comm":null},{"empno":7844,"ename":"TURNER","job":"SALESMAN","mgr":7698,"hiredate":"1981-09-08T00:00:00","sal":1500,"comm":null},{"empno":7900,"ename":"JAMES","job":"CLERK","mgr":7698,"hiredate":"1981-12-03T00:00:00","sal":950,"comm":null}]}');
  insert into dept_emp values('{"deptno":10,"dname":"ACCOUNTING","loc":"NEW YORK","empDetails":[{"empno":7782,"ename":"CLARK","job":"MANAGER","mgr":7839,"hiredate":"1981-06-09T00:00:00","sal":2450,"comm":null},{"empno":7839,"ename":"KING","job":"PRESIDENT","mgr":null,"hiredate":"1981-11-17T00:00:00","sal":5000,"comm":null},{"empno":7934,"ename":"MILLER","job":"CLERK","mgr":7782,"hiredate":"1982-01-23T00:00:00","sal":1300,"comm":null}]}');
  commit;
`.replace(/\n/g, "<br>")

export default view;
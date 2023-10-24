const view = `
CREATE OR REPLACE FORCE EDITIONABLE VIEW EMP_DEPT_UPSERT_VIEW AS 
select e.comm,
       e.empno,
       e.ename,
       e.hiredate,
       e.job,
       e.mgr,
       e.sal,
       d.deptno,
       d.dname,
       d.loc
from emp e
full join dept d on e.deptno = d.deptno
;

CREATE OR REPLACE EDITIONABLE TRIGGER EMP_DEPT_UPSERT_VIEW_TRIGGER_INSERT
INSTEAD OF INSERT ON EMP_DEPT_UPSERT_VIEW
FOR EACH ROW
BEGIN
    -- dept upsert
    IF :new.dname is not null then
        MERGE INTO dept a
        USING
            (select :new.deptno deptno from dual) b
        ON
            (a.deptno = b.deptno)
        WHEN MATCHED THEN
            update set dname = :new.dname, loc = :new.loc
            where deptno = :new.deptno
        WHEN NOT MATCHED THEN
            insert (deptno, dname, loc) values                    
            (:new.deptno, :new.dname, :new.loc);
    END IF;
    -- emp upsert
    IF :new.empno is not null then
        MERGE INTO emp a
        USING
            (select :new.empno empno from dual) b
        ON
            (a.empno = b.empno)
        WHEN MATCHED THEN
            update set comm = :new.comm, deptno = :new.deptno, ename = :new.ename, hiredate = :new.hiredate, job = :new.job, mgr = :new.mgr, sal = :new.sal
            where empno = :new.empno
        WHEN NOT MATCHED THEN
            insert (empno, ename, job, mgr, hiredate, sal, comm, deptno) values                    
            (:new.empno, :new.ename, :new.job, :new.mgr, :new.hiredate, :new.sal, :new.comm, :new.deptno);
    END IF;
END;
`.replace(/\n/g, "<br>")

  export default view;
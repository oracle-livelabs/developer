const view = "\
CREATE OR REPLACE FORCE EDITIONABLE VIEW EMP_DEPT_INSERT_VIEW AS \n\
select e.comm,\n\
       e.empno,\n\
       e.ename,\n\
       e.hiredate,\n\
       e.job,\n\
       e.mgr,\n\
       e.sal,\n\
       d.deptno,\n\
       d.dname,\n\
       d.loc\n\
from emp e\n\
full join dept d on e.deptno = d.deptno\n\
;\n\
\n\
CREATE OR REPLACE EDITIONABLE TRIGGER EMP_DEPT_INSERT_VIEW_TRIGGER_INSERT\n\
INSTEAD OF INSERT ON EMP_DEPT_INSERT_VIEW\n\
FOR EACH ROW\n\
BEGIN\n\
    -- dept upsert\n\
    IF :new.dname is not null then\n\
        MERGE INTO dept a\n\
        USING\n\
            (select :new.deptno deptno from dual) b\n\
        ON\n\
            (a.deptno = b.deptno)\n\
        WHEN MATCHED THEN\n\
            update set dname = :new.dname, loc = :new.loc\n\
            where deptno = :new.deptno\n\
        WHEN NOT MATCHED THEN\n\
            insert (deptno, dname, loc) values                    \n\
            (:new.deptno, :new.dname, :new.loc);\n\
    END IF;\n\
    -- emp upsert\n\
    IF :new.empno is not null then\n\
        MERGE INTO emp a\n\
        USING\n\
            (select :new.empno empno from dual) b\n\
        ON\n\
            (a.empno = b.empno)\n\
        WHEN MATCHED THEN\n\
            update set comm = :new.comm, deptno = :new.deptno, ename = :new.ename, hiredate = :new.hiredate, job = :new.job, mgr = :new.mgr, sal = :new.sal\n\
            where empno = :new.empno\n\
        WHEN NOT MATCHED THEN\n\
            insert (empno, ename, job, mgr, hiredate, sal, comm, deptno) values                    \n\
            (:new.empno, :new.ename, :new.job, :new.mgr, :new.hiredate, :new.sal, :new.comm, :new.deptno);\n\
    END IF;\n\
END;\n"
  .replace(/\n/g, "<br>")

  export default view;
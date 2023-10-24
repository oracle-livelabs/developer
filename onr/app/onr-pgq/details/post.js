const view = `
create or replace property graph empdept
    vertex tables (
        emp key(empno) label emp properties (
            empno,
            ename,
            job,
            mgr,
            hiredate,
            sal,
            comm,
            deptno
        ),
        dept key(deptno) label dept properties (
            deptno,
            dname,
            loc
        )
    )
    EDGE TABLES (
        emp AS works_at 
        SOURCE KEY ( empno ) REFERENCES emp (empno)
        DESTINATION KEY (deptno) REFERENCES dept (deptno)
    , 
        emp AS manager 
        SOURCE KEY ( empno ) REFERENCES emp (empno)
        DESTINATION KEY (empno) REFERENCES emp (mgr)
    )
;
`.replace(/\n/g, "<br>")

export default view;
CREATE OR REPLACE EDITIONABLE PROCEDURE "DEMO_USER"."PR_ADD_AND_ASSIGN_EMPLOYEE" (
      p_emp_name  IN VARCHAR2,
      p_dept_code IN VARCHAR2,
      p_comments  IN CLOB
  ) AS
      l_dept_id department.dept_id%TYPE;
  BEGIN
      SELECT dept_id
        INTO l_dept_id
        FROM department
       WHERE UPPER(dept_code) = UPPER(p_dept_code);

      INSERT INTO employee (
          emp_name,
          dept_id,
          comments
      )
      VALUES (
          p_emp_name,
          l_dept_id,
          p_comments
      );

  EXCEPTION
      WHEN NO_DATA_FOUND THEN
          raise_application_error(
              -20001,
              'Department code not found. Valid values: ' ||
              'EN003, FN002, HR001, IT007, LG006, LG009, ' ||
              'MK005, OP010, SA004, SP008'
          );
  END;
/


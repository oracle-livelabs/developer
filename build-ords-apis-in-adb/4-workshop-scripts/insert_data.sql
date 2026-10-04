-- ==========================================
-- INSERT DATA
-- ==========================================
INSERT INTO DEPARTMENT (DEPT_CODE, ESTABLISHED, DETAILS) VALUES
    ('HR001', DATE '2001-04-13', JSON_OBJECT('location' VALUE 'Bldg 1', 'members' VALUE 25)),
    ('FN002', DATE '2002-06-20', JSON_OBJECT('location' VALUE 'Bldg 2', 'members' VALUE 20)),
    ('EN003', DATE '2000-11-01', JSON_OBJECT('location' VALUE 'Bldg 3', 'members' VALUE 40)),
    ('SA004', DATE '2005-01-15', JSON_OBJECT('location' VALUE 'Bldg 4', 'members' VALUE 18)),
    ('MK005', DATE '2003-12-07', JSON_OBJECT('location' VALUE 'Bldg 5', 'members' VALUE 15)),
    ('LG006', DATE '2010-03-31', JSON_OBJECT('location' VALUE 'Bldg 6', 'members' VALUE 5)),
    ('IT007', DATE '2001-09-23', JSON_OBJECT('location' VALUE 'Bldg 7', 'members' VALUE 30)),
    ('SP008', DATE '2015-05-05', JSON_OBJECT('location' VALUE 'Bldg 8', 'members' VALUE 12)),
    ('LG009', DATE '2012-07-14', JSON_OBJECT('location' VALUE 'Bldg 9', 'members' VALUE 10)),
    ('OP010', DATE '2008-08-01', JSON_OBJECT('location' VALUE 'Bldg 10', 'members' VALUE 22));
    COMMIT;

INSERT INTO PROJECT (PROJ_NAME, DEPT_ID, IS_ACTIVE) VALUES
    ('Onboarding', 1, TRUE),
    ('Audit2024', 2, FALSE),
    ('NewApp', 3, TRUE),
    ('SalesCampaign', 4, TRUE),
    ('SocialMediaPush', 5, FALSE),
    ('Compliance', 6, TRUE),
    ('UpgradeInfra', 7, TRUE),
    ('HelpdeskRevamp', 8, TRUE),
    ('FleetUpdate', 9, TRUE),
    ('ProcessReorg', 10, FALSE);
    COMMIT;

INSERT INTO EMPLOYEE (EMP_NAME, DEPT_ID, COMMENTS) VALUES
    ('Alice', 1,  'Strong analyst, quick learner.'),
    ('Bob', 2,  'CPA certification in progress.'),
    ('Carol', 3,  'Dev team lead for NewApp project.'),
    ('David', 4,  'Consistent sales over target.'),
    ('Eve', 5,  'Leads digital campaigns.'),
    ('Frank', 6,  'Subject matter expert in compliance.'),
    ('Grace', 7,  'Skilled in infrastructure upgrades.'),
    ('Heidi', 8,  'Customer support supervisor.'),
    ('Ivan', 9,  'Fleet manager - long tenure.'),
    ('Judy', 10,  'Operations management veteran.');
    COMMIT;
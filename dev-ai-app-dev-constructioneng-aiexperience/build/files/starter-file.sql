-- Construction Engineering supplier evaluation model
DROP TABLE IF EXISTS CE_SUPPLIER_DEPENDENCIES CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_PROJECT_CHUNKS CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_DECISION CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_SUPPORTING_DOCS CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_SUPPLIER_EVALUATION CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_SUPPLIER_RECOMMENDATION CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_SUPPLIER_PERFORMANCE CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_SUPPLIER_CERTIFICATIONS CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_SUPPLIERS CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_PROJECT_REQUIREMENTS CASCADE CONSTRAINTS PURGE;
DROP TABLE IF EXISTS CE_PROJECTS CASCADE CONSTRAINTS PURGE;
DROP VIEW IF EXISTS CONSTRUCTION_PROJECTS_DV;
DROP PROPERTY GRAPH IF EXISTS CONSTRUCTION_ENGINEERING_GRAPH;

CREATE TABLE IF NOT EXISTS CE_PROJECTS (
    PROJECT_ID NUMBER PRIMARY KEY,
    PROJECT_NAME VARCHAR2(200) NOT NULL,
    LOCATION VARCHAR2(200),
    PROJECT_TYPE VARCHAR2(100),
    PROJECT_PHASE VARCHAR2(100),
    PROJECT_SUMMARY CLOB,
    START_DATE DATE,
    TARGET_DELIVERY_DATE DATE,
    EVALUATION_STATUS VARCHAR2(50),
    CREATED_BY VARCHAR2(100)
);

CREATE TABLE IF NOT EXISTS CE_PROJECT_REQUIREMENTS (
    REQUIREMENT_ID NUMBER PRIMARY KEY,
    PROJECT_ID NUMBER REFERENCES CE_PROJECTS(PROJECT_ID),
    TRADE_CATEGORY VARCHAR2(100),
    MATERIAL_NEED VARCHAR2(200),
    TECHNICAL_SPEC CLOB,
    REQUIRED_CERTIFICATION VARCHAR2(200),
    DELIVERY_WINDOW VARCHAR2(100),
    PROCUREMENT_URGENCY VARCHAR2(50),
    BUDGET_RANGE VARCHAR2(100),
    RISK_LEVEL VARCHAR2(50)
);

CREATE TABLE IF NOT EXISTS CE_SUPPLIERS (
    SUPPLIER_ID NUMBER PRIMARY KEY,
    SUPPLIER_NAME VARCHAR2(200) NOT NULL,
    CATEGORY VARCHAR2(100),
    REGION VARCHAR2(100),
    EMAIL VARCHAR2(100),
    PHONE_NUMBER VARCHAR2(20),
    ACTIVE CHAR(1),
    CAPACITY_STATUS VARCHAR2(50),
    CAPABILITY_SUMMARY CLOB
);

CREATE TABLE IF NOT EXISTS CE_SUPPLIER_CERTIFICATIONS (
    CERT_ID NUMBER PRIMARY KEY,
    SUPPLIER_ID NUMBER REFERENCES CE_SUPPLIERS(SUPPLIER_ID),
    CERTIFICATION_NAME VARCHAR2(200),
    ISSUED_BY VARCHAR2(200),
    EXPIRES_ON DATE,
    STATUS VARCHAR2(50)
);

CREATE TABLE IF NOT EXISTS CE_SUPPLIER_PERFORMANCE (
    PERFORMANCE_ID NUMBER PRIMARY KEY,
    SUPPLIER_ID NUMBER REFERENCES CE_SUPPLIERS(SUPPLIER_ID),
    PROJECT_TYPE VARCHAR2(100),
    SIMILAR_PROJECT_COUNT NUMBER,
    ON_TIME_DELIVERY_RATE NUMBER(5,2),
    COST_VARIANCE_PCT NUMBER(5,2),
    UNRESOLVED_NCR_COUNT NUMBER,
    SAFETY_SCORE NUMBER(5,2),
    LAST_EVALUATED DATE
);

CREATE TABLE IF NOT EXISTS CE_SUPPLIER_RECOMMENDATION (
    RECOMMEND_ID NUMBER PRIMARY KEY,
    PROJECT_ID NUMBER REFERENCES CE_PROJECTS(PROJECT_ID),
    SUPPLIER_ID NUMBER REFERENCES CE_SUPPLIERS(SUPPLIER_ID),
    RECOMMENDATION VARCHAR2(50),
    FIT_SCORE NUMBER(5,2),
    RISK_LEVEL VARCHAR2(50),
    EXPLANATION CLOB,
    STRENGTHS CLOB,
    MISSING_INFORMATION CLOB,
    GENERATED_DATE DATE DEFAULT SYSDATE
);

CREATE TABLE IF NOT EXISTS CE_SUPPLIER_EVALUATION (
    EVALUATION_ID NUMBER PRIMARY KEY,
    PROJECT_ID NUMBER REFERENCES CE_PROJECTS(PROJECT_ID),
    RECOMMEND_ID NUMBER REFERENCES CE_SUPPLIER_RECOMMENDATION(RECOMMEND_ID),
    REQUEST_DATE DATE,
    EVALUATION_STATUS VARCHAR2(50),
    FINAL_DECISION VARCHAR2(50),
    DECISION_DATE DATE
);

CREATE TABLE IF NOT EXISTS CE_SUPPORTING_DOCS (
    DOC_ID NUMBER PRIMARY KEY,
    PROJECT_ID NUMBER REFERENCES CE_PROJECTS(PROJECT_ID),
    SUPPLIER_ID NUMBER REFERENCES CE_SUPPLIERS(SUPPLIER_ID),
    DOC_TYPE VARCHAR2(100),
    FILE_NAME VARCHAR2(255),
    DOC_TEXT CLOB,
    UPLOAD_TIME DATE DEFAULT SYSDATE
);

CREATE TABLE IF NOT EXISTS CE_DECISION (
    DEC_ID NUMBER PRIMARY KEY,
    EVALUATION_ID NUMBER REFERENCES CE_SUPPLIER_EVALUATION(EVALUATION_ID),
    DECISION_TYPE VARCHAR2(50),
    LETTER_TEXT CLOB,
    GENERATED_ON DATE DEFAULT SYSDATE
);

CREATE TABLE IF NOT EXISTS CE_PROJECT_CHUNKS (
    CHUNK_ID NUMBER PRIMARY KEY,
    PROJECT_ID NUMBER REFERENCES CE_PROJECTS(PROJECT_ID),
    SUPPLIER_ID NUMBER REFERENCES CE_SUPPLIERS(SUPPLIER_ID),
    SOURCE_TYPE VARCHAR2(50),
    CHUNK_TEXT CLOB,
    CHUNK_VECTOR VECTOR(384,*,DENSE)
);

CREATE TABLE IF NOT EXISTS CE_SUPPLIER_DEPENDENCIES (
    DEPENDENCY_ID NUMBER PRIMARY KEY,
    SUPPLIER_ID NUMBER REFERENCES CE_SUPPLIERS(SUPPLIER_ID),
    RELATED_SUPPLIER_ID NUMBER REFERENCES CE_SUPPLIERS(SUPPLIER_ID),
    DEPENDENCY_TYPE VARCHAR2(100),
    RISK_NOTE VARCHAR2(1000)
);

INSERT INTO CE_PROJECTS VALUES (1001, 'Downtown Mixed-Use Tower', 'San Jose, California', 'Mixed-use commercial building', 'Procurement', 'Mid-rise mixed-use project requiring structural steel framing, fire-rated assemblies, shop drawing support, inspection documentation, and regional delivery within a compressed schedule. Atlas Structural Fabrication has complete documentation and low supplier risk, so this project is ready for approval.', DATE '2026-06-01', DATE '2026-08-15', 'Pending Review', 'Maya Chen');
INSERT INTO CE_PROJECTS VALUES (1002, 'Bayfront Utility Upgrade', 'Oakland, California', 'Infrastructure', 'Preconstruction', 'Public works utility upgrade requiring concrete vaults, electrical gear, traffic controls, and suppliers with public-sector documentation history.', DATE '2026-07-10', DATE '2026-10-01', 'In Progress', 'Jordan Patel');
INSERT INTO CE_PROJECTS VALUES (1003, 'Harbor Seismic Retrofit', 'Long Beach, California', 'Public works retrofit', 'Procurement', 'Seismic retrofit project requiring specialty steel bracing, strict public works documentation, DBE participation, and suppliers with clean nonconformance history. Existing supplier pool does not meet core compliance requirements, so the recommended action is to deny current suppliers and issue a new RFP.', DATE '2026-07-15', DATE '2026-09-30', 'Pending Review', 'Elena Ruiz');
INSERT INTO CE_PROJECTS VALUES (1004, 'North Campus Lab Expansion', 'Palo Alto, California', 'Laboratory expansion', 'Procurement', 'Laboratory expansion requiring HVAC equipment, cleanroom-compatible ductwork, seismic anchorage documentation, and manufacturer startup support. The evaluation is waiting for an uploaded technical addendum before AI re-analysis.', DATE '2026-08-01', DATE '2026-11-15', 'Pending Review', 'Priya Raman');

INSERT INTO CE_PROJECT_REQUIREMENTS VALUES (2001, 1001, 'Structural Steel', 'Fabricated beams, columns, and connection assemblies', 'AISC-compliant structural steel package for a mid-rise commercial frame, including mill certificates, weld procedures, shop drawings, and inspection documentation.', 'AISC Certification; AWS Certified Welders', 'Six weeks', 'High', '$2.4M - $2.9M', 'Low');
INSERT INTO CE_PROJECT_REQUIREMENTS VALUES (2002, 1002, 'Electrical Systems', 'Switchgear and underground utility components', 'Utility-grade electrical equipment with public works submittals, delivery traceability, and site coordination documentation.', 'UL Listed Components; OSHA Safety Program', 'Ten weeks', 'Medium', '$900K - $1.3M', 'Medium');
INSERT INTO CE_PROJECT_REQUIREMENTS VALUES (2003, 1003, 'Seismic Steel Bracing', 'Buckling-restrained braces, embeds, and retrofit connection plates', 'Public works seismic retrofit package requiring documented AISC fabrication, DBE participation, certified welding procedures, unresolved NCR count of zero, and verified delivery access for night work.', 'AISC Certification; AWS Certified Welders; DBE Participation', 'Four weeks', 'Critical', '$1.8M - $2.2M', 'High');
INSERT INTO CE_PROJECT_REQUIREMENTS VALUES (2004, 1004, 'Mechanical Systems', 'Cleanroom HVAC units, ductwork, controls, and startup support', 'Laboratory HVAC package requiring cleanroom-compatible ductwork, seismic anchorage calculations, TAB plan, manufacturer startup support, and submittal-ready technical documentation.', 'OSHPD/Seismic Anchorage Documentation; Factory Startup Authorization', 'Eight weeks', 'Medium', '$1.1M - $1.6M', 'Medium');

INSERT INTO CE_SUPPLIERS VALUES (3001, 'Atlas Structural Fabrication', 'Structural Steel', 'Northern California', 'estimating@atlasstructural.example', '408-555-0140', 'Y', 'Constrained', 'Certified structural steel fabricator with mid-rise commercial experience, shop drawing support, weld procedure documentation, and strong regional delivery history.');
INSERT INTO CE_SUPPLIERS VALUES (3002, 'WestBridge Steel Supply', 'Structural Steel', 'Bay Area', 'bids@westbridgesteel.example', '510-555-0188', 'Y', 'Available', 'Regional steel supplier with competitive cost history and broad material availability; updated inspection package is still pending.');
INSERT INTO CE_SUPPLIERS VALUES (3003, 'Northline Industrial Metals', 'Structural Steel', 'Central California', 'rfq@northlinemetals.example', '559-555-0199', 'Y', 'Available', 'Industrial metals supplier with strong fabrication capabilities and prior commercial work, but recent schedule confirmations are required due to historical delivery delays.');
INSERT INTO CE_SUPPLIERS VALUES (3004, 'Coastal Retrofit Metals', 'Seismic Steel', 'Southern California', 'bids@coastalretrofit.example', '562-555-0111', 'Y', 'Overloaded', 'Retrofit steel supplier with partial seismic brace experience but missing DBE documentation and open nonconformance items.');
INSERT INTO CE_SUPPLIERS VALUES (3005, 'Pacific Brace Works', 'Seismic Steel', 'California', 'estimating@pacificbrace.example', '714-555-0122', 'Y', 'Available', 'Specialty bracing supplier with competitive pricing but expired AISC certification and limited public works documentation.');
INSERT INTO CE_SUPPLIERS VALUES (3006, 'Civic Steel Partners', 'Seismic Steel', 'Western US', 'rfp@civicsteel.example', '916-555-0177', 'Y', 'Available', 'Regional steel supplier with public-sector references but unresolved weld NCRs and no verified night-work delivery plan.');
INSERT INTO CE_SUPPLIERS VALUES (3007, 'Precision Air Systems', 'Mechanical Systems', 'Northern California', 'labprojects@precisionair.example', '650-555-0133', 'Y', 'Available', 'Mechanical systems supplier with cleanroom HVAC experience, seismic anchorage partners, and factory startup authorization after updated technical package is received.');
INSERT INTO CE_SUPPLIERS VALUES (3008, 'Valley Mechanical Supply', 'Mechanical Systems', 'Bay Area', 'quotes@valleymechanical.example', '408-555-0166', 'Y', 'Constrained', 'Mechanical supplier with competitive cost history but missing cleanroom TAB documentation and limited startup support availability.');

INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4001, 3001, 'AISC Certified Fabricator', 'AISC', DATE '2027-05-31', 'Current');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4002, 3001, 'AWS Certified Welding Program', 'AWS', DATE '2027-03-15', 'Current');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4003, 3002, 'AISC Certified Fabricator', 'AISC', DATE '2026-12-31', 'Current');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4004, 3003, 'AWS Certified Welding Program', 'AWS', DATE '2027-01-20', 'Current');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4005, 3004, 'DBE Participation Letter', 'Agency Self-Report', DATE '2026-08-01', 'Missing');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4006, 3005, 'AISC Certified Fabricator', 'AISC', DATE '2025-12-31', 'Expired');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4007, 3006, 'AWS Certified Welding Program', 'AWS', DATE '2027-02-28', 'Current');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4008, 3007, 'Factory Startup Authorization', 'HVAC Manufacturer', DATE '2027-06-30', 'Current');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4009, 3007, 'Seismic Anchorage Partner Letter', 'Structural Engineer', DATE '2027-04-30', 'Current');
INSERT INTO CE_SUPPLIER_CERTIFICATIONS VALUES (4010, 3008, 'Cleanroom TAB Documentation', 'Independent TAB Agency', DATE '2026-09-01', 'Missing');

INSERT INTO CE_SUPPLIER_PERFORMANCE VALUES (5001, 3001, 'Mid-rise commercial', 3, 94.00, 2.10, 0, 96.00, DATE '2026-05-20');
INSERT INTO CE_SUPPLIER_PERFORMANCE VALUES (5002, 3002, 'Commercial steel framing', 2, 89.00, -1.80, 1, 91.00, DATE '2026-05-18');
INSERT INTO CE_SUPPLIER_PERFORMANCE VALUES (5003, 3003, 'Industrial and commercial', 4, 82.00, 4.70, 2, 88.00, DATE '2026-05-12');
INSERT INTO CE_SUPPLIER_PERFORMANCE VALUES (5004, 3004, 'Seismic retrofit', 1, 61.00, 9.40, 3, 74.00, DATE '2026-05-25');
INSERT INTO CE_SUPPLIER_PERFORMANCE VALUES (5005, 3005, 'Public works retrofit', 1, 68.00, 6.10, 1, 79.00, DATE '2026-05-28');
INSERT INTO CE_SUPPLIER_PERFORMANCE VALUES (5006, 3006, 'Civic infrastructure', 2, 72.00, 8.90, 2, 81.00, DATE '2026-05-29');
INSERT INTO CE_SUPPLIER_PERFORMANCE VALUES (5007, 3007, 'Laboratory HVAC', 4, 93.00, 1.80, 0, 95.00, DATE '2026-06-02');
INSERT INTO CE_SUPPLIER_PERFORMANCE VALUES (5008, 3008, 'Healthcare and lab mechanical', 3, 84.00, 3.90, 1, 88.00, DATE '2026-06-03');

INSERT INTO CE_SUPPLIER_RECOMMENDATION VALUES (6001, 1001, 3001, 'Approved', 97.00, 'Low', 'Atlas Structural Fabrication is approved because it has completed three similar mid-rise steel frame projects, maintains current AISC and AWS documentation, has a 96 percent on-time delivery rate, has no unresolved inspection failures in the past 24 months, and has confirmed capacity for the six-week delivery window.', 'AISC certification, certified weld procedures, commercial steel framing experience, complete mill certificates, clean inspection history, confirmed delivery capacity, low supplier risk.', 'No blocking information is missing. Proceed with supplier confirmation and purchase package preparation.', SYSDATE);
INSERT INTO CE_SUPPLIER_RECOMMENDATION VALUES (6002, 1001, 3002, 'Request Info', 86.00, 'Medium', 'WestBridge Steel Supply has competitive cost history and good regional availability, but the evaluation is incomplete because current inspection documentation has not been provided.', 'Competitive cost performance, regional availability, current AISC certification.', 'Updated inspection logs, mill certificates, and nonconformance closeout evidence.', SYSDATE);
INSERT INTO CE_SUPPLIER_RECOMMENDATION VALUES (6003, 1001, 3003, 'Request Info', 78.00, 'High', 'Northline Industrial Metals has fabrication capability and similar project experience, but prior delivery delays and unresolved nonconformance count require schedule and quality confirmation before selection.', 'Strong fabrication capabilities and similar project references.', 'Delivery schedule confirmation, corrective action evidence, and updated inspection records.', SYSDATE);
INSERT INTO CE_SUPPLIER_RECOMMENDATION VALUES (6004, 1003, 3004, 'Denied', 38.00, 'High', 'Coastal Retrofit Metals should be denied because DBE participation documentation is missing, capacity is overloaded, and three unresolved nonconformance reports conflict with the public works retrofit requirements.', 'Some seismic retrofit experience.', 'DBE letter, NCR closeout evidence, and capacity plan are missing. Submit an RFP for new qualified seismic steel suppliers.', SYSDATE);
INSERT INTO CE_SUPPLIER_RECOMMENDATION VALUES (6005, 1003, 3005, 'Denied', 34.00, 'High', 'Pacific Brace Works should be denied because AISC certification is expired and public works documentation is incomplete for the required seismic retrofit scope.', 'Competitive pricing.', 'Current AISC certification and public works documentation are missing. Submit an RFP for new qualified seismic steel suppliers.', SYSDATE);
INSERT INTO CE_SUPPLIER_RECOMMENDATION VALUES (6006, 1003, 3006, 'Denied', 31.00, 'Very High', 'Civic Steel Partners should be denied because unresolved weld nonconformance reports and no verified night-work logistics plan create unacceptable schedule and quality risk.', 'Public-sector references.', 'NCR closeout evidence and night-work delivery plan are missing. Submit an RFP for new qualified seismic steel suppliers.', SYSDATE);
INSERT INTO CE_SUPPLIER_RECOMMENDATION VALUES (6007, 1004, 3007, 'Request Info', 82.00, 'Medium', 'Precision Air Systems is the leading candidate for the lab expansion, but the evaluation is pending the updated technical addendum with cleanroom TAB plan, seismic anchorage package, and factory startup letter. Re-analyze after PDF upload.', 'Laboratory HVAC experience, clean startup support, current factory authorization.', 'Upload technical addendum with TAB plan, seismic anchorage package, startup letter, and updated delivery confirmation.', SYSDATE);
INSERT INTO CE_SUPPLIER_RECOMMENDATION VALUES (6008, 1004, 3008, 'Request Info', 68.00, 'Medium', 'Valley Mechanical Supply has cost advantages but lacks cleanroom TAB documentation and has constrained startup support availability.', 'Competitive cost history and regional availability.', 'Cleanroom TAB documentation and startup support confirmation are missing.', SYSDATE);

INSERT INTO CE_SUPPLIER_EVALUATION VALUES (7001, 1001, 6001, SYSDATE, 'Pending Review', NULL, NULL);
INSERT INTO CE_SUPPLIER_EVALUATION VALUES (7002, 1002, NULL, SYSDATE, 'In Progress', NULL, NULL);
INSERT INTO CE_SUPPLIER_EVALUATION VALUES (7003, 1003, 6004, SYSDATE, 'Pending Review', NULL, NULL);
INSERT INTO CE_SUPPLIER_EVALUATION VALUES (7004, 1004, 6007, SYSDATE, 'Pending Review', NULL, NULL);

INSERT INTO CE_SUPPORTING_DOCS VALUES (8001, 1001, 3001, 'Inspection Log', 'atlas_inspection_log_2026.pdf', 'Inspection log shows no unresolved weld inspection failures for comparable mid-rise commercial projects in the last 24 months.', SYSDATE);
INSERT INTO CE_SUPPORTING_DOCS VALUES (8002, 1001, 3001, 'Material Certificate', 'atlas_mill_certificates.pdf', 'Mill certificate package covers wide flange beams, columns, and connection assemblies required for the Downtown Mixed-Use Tower.', SYSDATE);
INSERT INTO CE_SUPPORTING_DOCS VALUES (8003, 1001, 3002, 'Qualification File', 'westbridge_supplier_qualification.pdf', 'Supplier qualification file confirms AISC certification and regional availability but omits the most recent inspection log.', SYSDATE);
INSERT INTO CE_SUPPORTING_DOCS VALUES (8004, 1003, 3004, 'Supplier Qualification', 'coastal_retrofit_qualification.pdf', 'Supplier package has missing DBE participation letter, overloaded shop capacity, and unresolved NCR history. Existing suppliers should be denied and new RFP should be submitted.', SYSDATE);
INSERT INTO CE_SUPPORTING_DOCS VALUES (8005, 1004, 3007, 'Pending Technical Addendum', 'Construction_Supplier_Evaluation.pdf', 'Upload PDF contains the lab HVAC technical addendum needed for AI re-analysis, including TAB plan, seismic anchorage package, startup letter, and updated delivery confirmation.', SYSDATE);
INSERT INTO CE_DECISION VALUES (9001, 7001, 'Approve Recommended', 'Atlas Structural Fabrication has complete certification, inspection, capacity, and delivery evidence. Recommended path is to approve and confirm the supplier.', SYSDATE);
INSERT INTO CE_DECISION VALUES (9002, 7003, 'RFP Recommended', 'Current seismic steel suppliers do not meet DBE, AISC, nonconformance, and logistics requirements. Deny current suppliers and submit a new RFP.', SYSDATE);
INSERT INTO CE_DECISION VALUES (9003, 7004, 'Request Info', 'Upload the lab HVAC technical addendum and re-run AI analysis before confirming supplier selection.', SYSDATE);

INSERT INTO CE_PROJECT_CHUNKS (CHUNK_ID, PROJECT_ID, SUPPLIER_ID, SOURCE_TYPE, CHUNK_TEXT) VALUES (10001, 1001, 3001, 'Project Requirement', 'Downtown Mixed-Use Tower requires structural steel framing, fabricated beams and columns, connection assemblies, AISC certification, AWS certified welders, mill certificates, shop drawings, inspection records, and delivery within six weeks. Required evidence is complete.');
INSERT INTO CE_PROJECT_CHUNKS (CHUNK_ID, PROJECT_ID, SUPPLIER_ID, SOURCE_TYPE, CHUNK_TEXT) VALUES (10002, 1001, 3001, 'Supplier Profile', 'Atlas Structural Fabrication has completed three similar mid-rise steel frame projects, maintains current AISC certification, has certified weld procedure documentation, confirmed delivery capacity, no unresolved inspection failures, and low supplier risk.');
INSERT INTO CE_PROJECT_CHUNKS (CHUNK_ID, PROJECT_ID, SUPPLIER_ID, SOURCE_TYPE, CHUNK_TEXT) VALUES (10003, 1001, 3002, 'Supplier Profile', 'WestBridge Steel Supply has competitive cost history and good regional availability, but updated inspection documentation and nonconformance closeout records are missing.');
INSERT INTO CE_PROJECT_CHUNKS (CHUNK_ID, PROJECT_ID, SUPPLIER_ID, SOURCE_TYPE, CHUNK_TEXT) VALUES (10004, 1003, 3004, 'RFP Trigger', 'Harbor Seismic Retrofit has no acceptable supplier in the current pool. Coastal Retrofit Metals lacks DBE documentation, Pacific Brace Works has expired AISC certification, and Civic Steel Partners has unresolved weld NCRs. Deny suppliers and submit an RFP.');
INSERT INTO CE_PROJECT_CHUNKS (CHUNK_ID, PROJECT_ID, SUPPLIER_ID, SOURCE_TYPE, CHUNK_TEXT) VALUES (10005, 1004, 3007, 'PDF Upload Scenario', 'North Campus Lab Expansion is awaiting a technical addendum PDF. Upload should add cleanroom TAB plan, seismic anchorage package, factory startup authorization, and updated delivery confirmation for AI re-analysis.');
INSERT INTO CE_SUPPLIER_DEPENDENCIES VALUES (11001, 3001, 3002, 'Shared coating subcontractor', 'Both suppliers may use the same coating subcontractor, which could create schedule pressure if both are selected for concurrent projects.');
INSERT INTO CE_SUPPLIER_DEPENDENCIES VALUES (11002, 3004, 3006, 'Shared inspection consultant', 'Both seismic retrofit suppliers rely on the same inspection consultant, creating a hidden review bottleneck for public works closeout.');

CREATE OR REPLACE JSON RELATIONAL DUALITY VIEW construction_projects_dv AS
SELECT JSON {
  '_id': p.PROJECT_ID,
  'projectName': p.PROJECT_NAME,
  'location': p.LOCATION,
  'projectType': p.PROJECT_TYPE,
  'projectPhase': p.PROJECT_PHASE,
  'projectSummary': p.PROJECT_SUMMARY,
  'startDate': p.START_DATE,
  'targetDeliveryDate': p.TARGET_DELIVERY_DATE,
  'evaluationStatus': p.EVALUATION_STATUS,
  'createdBy': p.CREATED_BY,
  'requirements': [
    SELECT JSON {
      'requirementId': r.REQUIREMENT_ID,
      'tradeCategory': r.TRADE_CATEGORY,
      'materialNeed': r.MATERIAL_NEED,
      'technicalSpec': r.TECHNICAL_SPEC,
      'requiredCertification': r.REQUIRED_CERTIFICATION,
      'deliveryWindow': r.DELIVERY_WINDOW,
      'procurementUrgency': r.PROCUREMENT_URGENCY,
      'budgetRange': r.BUDGET_RANGE,
      'riskLevel': r.RISK_LEVEL
    }
    FROM CE_PROJECT_REQUIREMENTS r WITH INSERT UPDATE DELETE
    WHERE r.PROJECT_ID = p.PROJECT_ID
  ],
  'supplierEvaluations': [
    SELECT JSON {
      'evaluationId': e.EVALUATION_ID,
      'requestDate': e.REQUEST_DATE,
      'evaluationStatus': e.EVALUATION_STATUS,
      'finalDecision': e.FINAL_DECISION,
      'decisionDate': e.DECISION_DATE,
      'recommendation': (
        SELECT JSON {
          'recommendId': rec.RECOMMEND_ID,
          'recommendation': rec.RECOMMENDATION,
          'fitScore': rec.FIT_SCORE,
          'riskLevel': rec.RISK_LEVEL,
          'explanation': rec.EXPLANATION,
          'strengths': rec.STRENGTHS,
          'missingInformation': rec.MISSING_INFORMATION,
          'generatedDate': rec.GENERATED_DATE,
          'supplier': (
            SELECT JSON {
              'supplierId': s.SUPPLIER_ID,
              'supplierName': s.SUPPLIER_NAME,
              'category': s.CATEGORY,
              'region': s.REGION,
              'email': s.EMAIL,
              'phone': s.PHONE_NUMBER,
              'active': s.ACTIVE,
              'capacityStatus': s.CAPACITY_STATUS,
              'capabilitySummary': s.CAPABILITY_SUMMARY
            }
            FROM CE_SUPPLIERS s
            WHERE s.SUPPLIER_ID = rec.SUPPLIER_ID
          )
        }
        FROM CE_SUPPLIER_RECOMMENDATION rec WITH UPDATE
        WHERE rec.RECOMMEND_ID = e.RECOMMEND_ID
      )
    }
    FROM CE_SUPPLIER_EVALUATION e WITH INSERT UPDATE DELETE
    WHERE e.PROJECT_ID = p.PROJECT_ID
  ]
}
FROM CE_PROJECTS p
WITH INSERT UPDATE DELETE;

CREATE OR REPLACE PROPERTY GRAPH CONSTRUCTION_ENGINEERING_GRAPH
  VERTEX TABLES (
    "CE_PROJECTS" KEY ("PROJECT_ID") PROPERTIES ("PROJECT_NAME", "LOCATION", "PROJECT_TYPE", "PROJECT_PHASE", "EVALUATION_STATUS"),
    "CE_PROJECT_REQUIREMENTS" KEY ("REQUIREMENT_ID") PROPERTIES ("PROJECT_ID", "TRADE_CATEGORY", "MATERIAL_NEED", "REQUIRED_CERTIFICATION", "PROCUREMENT_URGENCY", "RISK_LEVEL"),
    "CE_SUPPLIERS" KEY ("SUPPLIER_ID") PROPERTIES ("SUPPLIER_NAME", "CATEGORY", "REGION", "ACTIVE", "CAPACITY_STATUS"),
    "CE_SUPPLIER_RECOMMENDATION" KEY ("RECOMMEND_ID") PROPERTIES ("PROJECT_ID", "SUPPLIER_ID", "RECOMMENDATION", "FIT_SCORE", "RISK_LEVEL"),
    "CE_SUPPLIER_EVALUATION" KEY ("EVALUATION_ID") PROPERTIES ("PROJECT_ID", "RECOMMEND_ID", "EVALUATION_STATUS", "FINAL_DECISION"),
    "CE_SUPPLIER_DEPENDENCIES" KEY ("DEPENDENCY_ID") PROPERTIES ("SUPPLIER_ID", "RELATED_SUPPLIER_ID", "DEPENDENCY_TYPE", "RISK_NOTE")
  )
  EDGE TABLES (
    "CE_PROJECT_REQUIREMENTS" AS project_has_requirement
      SOURCE KEY ("PROJECT_ID") REFERENCES "CE_PROJECTS"("PROJECT_ID")
      DESTINATION KEY ("REQUIREMENT_ID") REFERENCES "CE_PROJECT_REQUIREMENTS"("REQUIREMENT_ID")
      PROPERTIES ("TRADE_CATEGORY", "PROCUREMENT_URGENCY", "RISK_LEVEL"),
    "CE_SUPPLIER_RECOMMENDATION" AS project_recommends_supplier
      SOURCE KEY ("PROJECT_ID") REFERENCES "CE_PROJECTS"("PROJECT_ID")
      DESTINATION KEY ("SUPPLIER_ID") REFERENCES "CE_SUPPLIERS"("SUPPLIER_ID")
      PROPERTIES ("RECOMMEND_ID", "RECOMMENDATION", "FIT_SCORE", "RISK_LEVEL"),
    "CE_SUPPLIER_EVALUATION" AS evaluation_for_project
      SOURCE KEY ("PROJECT_ID") REFERENCES "CE_PROJECTS"("PROJECT_ID")
      DESTINATION KEY ("EVALUATION_ID") REFERENCES "CE_SUPPLIER_EVALUATION"("EVALUATION_ID")
      PROPERTIES ("EVALUATION_STATUS", "FINAL_DECISION"),
    "CE_SUPPLIER_DEPENDENCIES" AS supplier_dependency
      SOURCE KEY ("SUPPLIER_ID") REFERENCES "CE_SUPPLIERS"("SUPPLIER_ID")
      DESTINATION KEY ("RELATED_SUPPLIER_ID") REFERENCES "CE_SUPPLIERS"("SUPPLIER_ID")
      PROPERTIES ("DEPENDENCY_TYPE", "RISK_NOTE")
  );

COMMIT;

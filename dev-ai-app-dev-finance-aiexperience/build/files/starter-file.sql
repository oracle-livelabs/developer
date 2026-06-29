/* Construction engineering starter schema for the AI Experience workshop */
/* NOTE: Keep statements in this file contiguous when running them in SQL tools. */

drop view if exists project_profiles_dv;
drop table if exists project_recommendation_chunk;
drop table if exists project_option_catalog;
drop table if exists construction_project_requests;
drop table if exists project_sponsors;

create table if not exists project_sponsors (
    project_id           varchar2(30) primary key,
    sponsor_first_name   varchar2(100),
    sponsor_last_name    varchar2(100),
    city                 varchar2(100),
    state                varchar2(100),
    zip_code             varchar2(20),
    annual_revenue       number(12,2)
);

create table if not exists construction_project_requests (
    request_id                 varchar2(30) primary key,
    project_id                 varchar2(30) not null references project_sponsors(project_id),
    project_name               varchar2(200),
    project_type               varchar2(100),
    site_risk_score            number(5,2),
    requested_project_budget   number(12,2),
    current_committed_spend    number(12,2),
    estimated_duration_days    number,
    project_status             varchar2(40),
    permit_complexity          varchar2(40)
);

create table if not exists project_option_catalog (
    option_id                            number primary key,
    provider_name                        varchar2(200),
    project_package                      varchar2(120),
    financing_rate                       number(5,2),
    mobilization_fee                     number(12,2),
    time_to_start                        number,
    min_site_risk_score                  number(5,2),
    max_budget_to_revenue_ratio          number(6,2),
    min_annual_revenue                   number(12,2),
    required_site_prep_percent           number(5,2),
    requires_government_coordination     varchar2(5)
);

create table if not exists project_recommendation_chunk (
    project_id      varchar2(30) not null,
    chunk_id        number not null,
    chunk_text      clob,
    chunk_vector    vector(384, float32),
    constraint project_recommendation_chunk_pk primary key (project_id, chunk_id)
);

insert into project_sponsors (project_id, sponsor_first_name, sponsor_last_name, city, state, zip_code, annual_revenue) values
('PROJ_1000', 'James', 'Smith', 'Dallas', 'Texas', '75001', 2500000),
('PROJ_1001', 'James', 'Woods', 'Houston', 'Texas', '77001', 350000),
('PROJ_1002', 'Alex', 'Anderson', 'Austin', 'Texas', '73301', 1200000);

insert into construction_project_requests (request_id, project_id, project_name, project_type, site_risk_score, requested_project_budget, current_committed_spend, estimated_duration_days, project_status, permit_complexity) values
('REQ_1000', 'PROJ_1000', 'North Yard Utility Expansion', 'Utility Upgrade', 780, 650000, 120000, 180, 'Pending Review', 'Medium'),
('REQ_1001', 'PROJ_1001', 'Warehouse Retrofit Phase 2', 'Retrofit', 560, 950000, 310000, 240, 'Pending Review', 'High'),
('REQ_1002', 'PROJ_1002', 'Municipal Streetscape Refresh', 'Civil Works', 690, 420000, 90000, 150, 'Pending Review', 'Medium');

insert into project_option_catalog (option_id, provider_name, project_package, financing_rate, mobilization_fee, time_to_start, min_site_risk_score, max_budget_to_revenue_ratio, min_annual_revenue, required_site_prep_percent, requires_government_coordination) values
(11, 'Atlas Build Partners', 'Fast-Track Site Package', 4.20, 12000, 14, 700, 0.35, 1000000, 15, 'NO'),
(19, 'Cornerstone Civil', 'Permit-Ready Infrastructure Package', 4.90, 18000, 21, 640, 0.40, 850000, 20, 'YES'),
(26, 'Summit Structural Group', 'Veteran Contractor Renewal Package', 4.10, 9000, 10, 760, 0.30, 1500000, 10, 'NO'),
(31, 'Urban Grid Works', 'Deferred Site Prep Package', 5.40, 7500, 28, 580, 0.45, 300000, 5, 'YES');

create or replace json relational duality view project_profiles_dv as
    project_sponsors @insert @update @delete
    {
        _id : project_id,
        sponsorFirstName : sponsor_first_name,
        sponsorLastName : sponsor_last_name,
        city,
        state,
        zipCode : zip_code,
        annualRevenue : annual_revenue,
        projectRequests : construction_project_requests @insert @update @delete
        [
            {
                requestId : request_id,
                projectName : project_name,
                projectType : project_type,
                siteRiskScore : site_risk_score,
                requestedProjectBudget : requested_project_budget,
                currentCommittedSpend : current_committed_spend,
                estimatedDurationDays : estimated_duration_days,
                projectStatus : project_status,
                permitComplexity : permit_complexity
            }
        ]
    };

/* Construction procurement starter schema for the AI Experience workshop */

drop view if exists procurement_profiles_dv;
drop table if exists procurement_recommendation_chunk;
drop table if exists supplier_option_catalog;
drop table if exists construction_procurements;

create table if not exists construction_procurements (
    project_id               varchar2(30) primary key,
    project_code             varchar2(30),
    project_name             varchar2(200),
    location                 varchar2(200),
    project_phase            varchar2(100),
    required_trade           varchar2(100),
    procurement_urgency      varchar2(50),
    budget_range             varchar2(50),
    risk_level               varchar2(50),
    project_status           varchar2(40)
);

create table if not exists supplier_option_catalog (
    supplier_option_id       number primary key,
    supplier_name            varchar2(200),
    trade_specialty          varchar2(120),
    experience_summary       varchar2(400),
    compliance_status        varchar2(120),
    on_time_delivery_rate    varchar2(50),
    delivery_window_weeks    number,
    capacity_status          varchar2(100),
    project_fit              varchar2(200),
    recommendation_status    varchar2(40)
);

create table if not exists procurement_recommendation_chunk (
    project_id      varchar2(30) not null,
    chunk_id        number not null,
    chunk_text      clob,
    chunk_vector    vector(384, float32),
    constraint procurement_recommendation_chunk_pk primary key (project_id, chunk_id)
);

insert into construction_procurements (project_id, project_code, project_name, location, project_phase, required_trade, procurement_urgency, budget_range, risk_level, project_status) values
('1001', 'P1001', 'Downtown Mixed-Use Tower', 'Chicago, IL', 'Structural Frame', 'Structural Steel', 'High', '$4.0-5.5M', 'Low Risk', 'Pending Review'),
('1003', 'P1003', 'Harbor Seismic Retrofit', 'Long Beach, CA', 'Retrofit', 'Seismic Steel Retrofit', 'Critical', '$6.5-8.0M', 'High Risk', 'Pending Review'),
('1004', 'P1004', 'North Campus Lab Expansion', 'Austin, TX', 'Procurement Planning', 'Mechanical + Lab Fit-Out', 'Medium', '$1.1-1.6M', 'Medium Risk', 'Pending Review');

insert into supplier_option_catalog (supplier_option_id, supplier_name, trade_specialty, experience_summary, compliance_status, on_time_delivery_rate, delivery_window_weeks, capacity_status, project_fit, recommendation_status) values
(7001, 'Atlas Structural Fabrication', 'Structural Steel', 'Strong mid-rise steel frame project experience', 'Current AISC and AWS documentation', '96%', 6, 'Confirmed', 'High fit for six-week downtown tower delivery', 'Recommended'),
(7002, 'Metro Build Systems', 'Structural Steel', 'Broad tower podium and transfer deck experience', 'AISC current, AWS renewal pending', '92%', 8, 'Limited', 'Good fit but tighter capacity window', 'Review'),
(7003, 'Coastal Retrofit Metals', 'Seismic Retrofit Steel', 'Extensive retrofit portfolio in coastal zones', 'Compliance gaps under review', '88%', 10, 'Conditional', 'Technically aligned but elevated risk profile', 'Denied'),
(7004, 'Northline MEP Supply', 'Mechanical + Lab Fit-Out', 'University and life-science lab package experience', 'Current QA and safety files', '94%', 7, 'Confirmed', 'Good fit for updated lab expansion budget', 'Recommended');

create or replace json relational duality view procurement_profiles_dv as
    construction_procurements @insert @update @delete
    {
        _id : project_id,
        projectCode : project_code,
        projectName : project_name,
        location,
        projectPhase : project_phase,
        requiredTrade : required_trade,
        procurementUrgency : procurement_urgency,
        budgetRange : budget_range,
        riskLevel : risk_level,
        projectStatus : project_status
    };

drop  TABLE if exists stelle;
create table stelle (
        id serial primary key,
        nome VARCHAR(400),
        zone numeric,
        stelle_per_zona VARCHAR(400),
        board VARCHAR(4000),
        data_ora timestamp DEFAULT CURRENT_TIMESTAMP
);

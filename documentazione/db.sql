drop  TABLE if exists stelle;
drop  TABLE if exists crucipixel;
drop  TABLE if exists grattacieli;
create table stelle (
        id serial primary key,
        nome VARCHAR(400),
        zone numeric,
        stelle_per_zona VARCHAR(400),
        board VARCHAR(4000),
        board_gioco VARCHAR(4000),
        data_ora timestamp DEFAULT CURRENT_TIMESTAMP
);
create table grattacieli (
        id serial primary key,
        nome VARCHAR(400),
        piani numeric,
        board VARCHAR(4000),
        data_ora timestamp DEFAULT CURRENT_TIMESTAMP
);
create table crucipixel (
        id serial primary key,
        nome VARCHAR(400),
        history_photo numeric,
        board VARCHAR(4000),
        testo_board VARCHAR(4000),
        dati_colonna_board VARCHAR(4000),
        dati_riga_board VARCHAR(4000),
        history_board VARCHAR(10300000),
        data_ora timestamp DEFAULT CURRENT_TIMESTAMP
);
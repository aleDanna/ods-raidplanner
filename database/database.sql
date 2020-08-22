DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE SEQUENCE credentials_seq START 1;
CREATE SEQUENCE users_seq START 1;
CREATE SEQUENCE characters_seq START 1;
CREATE SEQUENCE raids_seq START 1;
CREATE SEQUENCE raid_subscriptions_seq START 1;

CREATE TABLE credentials (
                             id numeric primary key DEFAULT NEXTVAL('credentials_seq'),
                             username varchar not null unique,
                             password varchar not null,
                             role varchar not null
);

CREATE TABLE users (
                       id numeric primary key DEFAULT NEXTVAL('users_seq'),
                       name varchar not null,
                       surname varchar not null,
                       eso_username varchar unique not null,
                       rank numeric not null,
                       credentials_ref numeric unique not null references credentials
);

CREATE TABLE roles (
                       id numeric primary key not null ,
                       name varchar not null unique
);

CREATE TABLE characters (
                            id numeric primary key DEFAULT NEXTVAL('characters_seq'),
                            name varchar,
                            role_ref numeric not null references roles,
                            user_ref numeric not null references users
);

CREATE TABLE raid_groups (
                             id numeric primary key not null,
                             name varchar not null unique,
                             rank numeric not null unique,
                             image_name varchar
);

CREATE TABLE raids (
                       id numeric primary key DEFAULT NEXTVAL('raids_seq'),
                       start_date timestamp not null,
                       end_date timestamp not null,
                       group_ref numeric not null references raid_groups
);

CREATE TABLE raid_subscriptions (
                                    id numeric primary key DEFAULT NEXTVAL('raid_subscriptions_seq'),
                                    character_ref numeric not null references characters,
                                    raid_ref numeric not null references raids,
                                    group_number numeric not null DEFAULT 0,
                                    UNIQUE (character_ref, raid_ref)
);

INSERT INTO roles (id, name) values
(1, 'TANK'),
(2, 'HEALER'),
(3, 'DAMAGE_DEALER');

INSERT INTO raid_groups (id, name, rank, image_name) values
(1, 'IV_LEGIONE', 1, 'iv_legione_group_icon'),
(2, 'V_LEGIONE', 2, 'v_legione_group_icon'),
(3, 'NUMIDIAN_GUARD', 3, 'n_guard_group_icon'),
(4, 'TWO_MOONS_GUARD', 4, 'tm_group_icon'),
(5, 'LORKHAN_GUARD', 5, 'lorkhan_group_icon');


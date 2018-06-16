-- Postgres sql schema

create database tracking;
grant all on database tracking to postgres;

create table tracking_users (
	id serial not null,
	name varchar(200) not null,
	email varchar(100),
	mobile varchar(15),
	user_role varchar(15) not null,
	created_date timestamp not null,
	enc_password varchar(500) not null,
	active smallint default 1,
	locked smallint default 0
);

insert into tracking_users(name,email,mobile,user_role,created_date,enc_password)
values('dummy','dummy@mail.com','9999999999','student',now(),'dummy');
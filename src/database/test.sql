INSERT INTO credentials (id, username, password, role) values
(1001, 'test', 'test', 'DEFAULT'),
(1002, 'test2', 'test2', 'DEFAULT'),
(1003, 'admin', 'admin', 'ADMIN');

INSERT INTO users (id, name, surname, eso_username, rank, credentials_ref) values
(1001, 'test', 'test', 'aleD94', 1, 1001),
(1002, 'test2', 'test2', 'vdvdvf', 2, 1002),
(1003, 'Admin', 'Super', 'adminESO', 5, 1003);

INSERT INTO characters (id, name, role_ref, user_ref) values
(1001, 'oban whisky', 3, 1001),
(1002, 'brandir', 1, 1001),
(1003, 'noshop', 2, 1002),
(1004, 'ivo avido', 3, 1003),
(1005, 'rupert sciamenna', 1, 1003);


INSERT INTO raids (id, start_date, end_date, group_ref) values
(1001,'2020-07-20 21:30:00', '2020-07-21 00:00:00', 1),
(1002, '2020-07-20 21:30:00', '2020-07-21 00:00:00', 2),
(1003, '2020-07-22 21:30:00', '2020-07-22 00:00:00', 1),
(1004, '2020-07-24 21:30:00', '2020-07-24 00:00:00', 1),
(1005, '2020-07-24 21:30:00', '2020-07-24 00:00:00', 2),
(1006, '2020-07-25 21:30:00', '2020-07-25 00:00:00', 1),
(1007, '2020-07-26 21:30:00', '2020-07-26 00:00:00', 2),
(1008, '2020-07-27 21:30:00', '2020-07-27 00:00:00', 1),
(1009, '2020-07-27 21:30:00', '2020-07-27 00:00:00', 2),
(1010, '2020-07-30 21:30:00', '2020-07-30 00:00:00', 1);

INSERT INTO credentials (id, username, password, role) values
(1, 'test', 'test', 'DEFAULT'),
(2, 'test2', 'test2', 'DEFAULT'),
(3, 'admin', 'admin', 'ADMIN');

INSERT INTO users (id, name, surname, eso_username, rank, credentials_ref) values
(1, 'test', 'test', 'aleD94', 1, 1),
(2, 'test2', 'test2', 'vdvdvf', 2, 2),
(3, 'Admin', 'Super', 'adminESO', 5, 3);

INSERT INTO characters (name, role_ref, user_ref) values
('oban whisky', 3, 1),
('brandir', 1, 1),
('noshop', 2, 2),
('ivo avido', 3, 3),
('rupert sciamenna', 1, 3);


INSERT INTO raids (id, start_date, end_date, subscriptions, group_ref) values
(1001,'2020-07-20 21:30:00', '2020-07-21 00:00:00', 7, 1),
(1002, '2020-07-20 21:30:00', '2020-07-21 00:00:00', 12, 2),
(1003, '2020-07-22 21:30:00', '2020-07-22 00:00:00', 18, 1),
(1004, '2020-07-24 21:30:00', '2020-07-24 00:00:00', 0, 1),
(1005, '2020-07-24 21:30:00', '2020-07-24 00:00:00', 36, 2),
(1006, '2020-07-25 21:30:00', '2020-07-25 00:00:00', 50, 1),
(1007, '2020-07-26 21:30:00', '2020-07-26 00:00:00', 11, 2),
(1008, '2020-07-27 21:30:00', '2020-07-27 00:00:00', 0, 1),
(1009, '2020-07-27 21:30:00', '2020-07-27 00:00:00', 2, 2),
(1010, '2020-07-30 21:30:00', '2020-07-30 00:00:00', 71, 1);

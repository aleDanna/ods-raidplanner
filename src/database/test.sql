INSERT INTO credentials (id, username, password) values
(1, 'test', 'test'),
(2, 'test2', 'test2');

INSERT INTO users (id, name, surname, eso_username, rank, credentials_ref) values
(1, 'test', 'test', 'aleD94', 1, 1),
(2, 'test2', 'test2', 'vdvdvf', 2, 2);

INSERT INTO characters (name, role_ref, user_ref) values
('oban whisky', 3, 1);

INSERT INTO raids (id, start_date, end_date, subscriptions, group_ref) values
(1,'2020-06-20 21:30:00', '2020-06-21 00:00:00', 7, 1),
(2, '2020-06-20 21:30:00', '2020-06-21 00:00:00', 12, 2),
(3, '2020-06-22 21:30:00', '2020-06-22 00:00:00', 18, 1),
(4, '2020-06-24 21:30:00', '2020-06-24 00:00:00', 0, 1),
(5, '2020-06-24 21:30:00', '2020-06-24 00:00:00', 36, 2),
(6, '2020-06-25 21:30:00', '2020-06-25 00:00:00', 50, 1),
(7, '2020-06-26 21:30:00', '2020-06-26 00:00:00', 11, 2),
(8, '2020-06-27 21:30:00', '2020-06-27 00:00:00', 0, 1),
(9, '2020-06-27 21:30:00', '2020-06-27 00:00:00', 2, 2),
(10, '2020-06-30 21:30:00', '2020-06-30 00:00:00', 71, 1);

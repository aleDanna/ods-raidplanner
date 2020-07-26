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

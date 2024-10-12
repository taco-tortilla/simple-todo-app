--------------------------------------------------
-- categories
--------------------------------------------------
insert into
  categories (name)
values
  ('study'),
  ('dev');

--------------------------------------------------
-- tasks
--------------------------------------------------
insert into
  tasks (title, description, is_done)
values
  ('英単語の勉強', '1~10ページをやる', false),
  ('ポートフォリの作成', null, true),
  ('azure functionsの実装', null, false);

--------------------------------------------------
-- tasks_categories
--------------------------------------------------
insert into
  tasks_categories (tasks_id, categories_id)
values
  (1, 1),
  (3, 2),
  (3, 1);
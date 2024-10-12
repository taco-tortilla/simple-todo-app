--------------------------------------------------
-- categories
--------------------------------------------------
DROP TABLE IF EXISTS categories CASCADE;

create table
  categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  );

--------------------------------------------------
-- tasks
--------------------------------------------------
DROP TABLE IF EXISTS tasks CASCADE;

create table
  tasks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title varchar(255) NOT NULL,
    description TEXT,
    is_done BOOLEAN NOT NULL DEFAULT false,
    deadline_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  );

--------------------------------------------------
-- tasks_categories
--------------------------------------------------
DROP TABLE IF EXISTS tasks_categories CASCADE;

create table
  tasks_categories (
    tasks_id INTEGER NOT NULL REFERENCES tasks (id),
    categories_id INTEGER NOT NULL REFERENCES categories (id),
    PRIMARY KEY (tasks_id, categories_id)
  );
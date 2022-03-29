/* Получить список всех категорий (идентификатор, наименование категории);*/
SELECT id, name FROM categories;

  /* Получить список категорий, для которых создана минимум одна публикация (идентификатор, наименование категории);*/
SELECT id, name FROM categories
  JOIN categories_articles ON id = category_id
  GROUP BY id;

  /* Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);*/
SELECT id, name, count(category_id) FROM categories
  LEFT JOIN categories_articles ON id = category_id
  GROUP BY id;

  /* Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;*/
SELECT
  a.id,
  a.title,
  a.announce,
  a.full_text,
  a.created_at,
  CONCAT(u.first_name, ' ', u.last_name) AS author,
  u.email,
  COUNT(DISTINCT comments.id) as comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles a
  JOIN categories_articles ON a.id = categories_articles.article_id
  JOIN categories ON categories_articles.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = a.id
  JOIN users u ON a.user_id = u.id
GROUP BY a.id, u.id
ORDER BY a.created_at ASC

  /* Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);*/
SELECT
  a.id,
  a.title,
  a.announce,
  a.full_text,
  a.created_at,
  CONCAT(u.first_name, ' ', u.last_name) AS author,
  u.email,
  COUNT(DISTINCT comments.id) as comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM
  (SELECT * FROM articles WHERE articles.id = 8) a
  JOIN categories_articles ON a.id = categories_articles.article_id
  JOIN categories ON categories_articles.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = a.id
  JOIN users u ON a.user_id = u.id
GROUP BY
  a.id,
  a.title,
  a.announce,
  a.full_text,
  a.created_at,
  u.id

  /* Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);*/
SELECT
  c.id,
  a.id AS article_id,
  CONCAT(u.first_name, ' ', u.last_name) AS author,
  c.text
FROM comments c
  JOIN articles a ON a.id = c.article_id
  JOIN users u ON a.user_id = u.id
ORDER BY c.created_at ASC
LIMIT 5;

  /* Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;*/
SELECT
  c.id AS comment_id,
  a.id AS article_id,
  CONCAT(u.first_name, ' ', u.last_name) AS author,
  c.text
FROM articles a
  JOIN comments c ON a.id = c.article_id
  JOIN users u ON a.user_id = u.id
WHERE a.id = 5
ORDER BY c.created_at ASC;

  /* Обновить заголовок определённой публикации на «Как я встретил Новый год»; */
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 5

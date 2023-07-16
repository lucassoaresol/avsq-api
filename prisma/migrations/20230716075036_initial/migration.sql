-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMMON', 'EDITOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLISHED', 'INDRAFT', 'SCHEDULED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "email" VARCHAR(254),
    "login" VARCHAR(128) NOT NULL,
    "password" VARCHAR(128),
    "cpf" VARCHAR(14),
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_first_access" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blog_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "published" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "content" JSON,
    "text" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'INDRAFT',
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "blog_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "card_id" TEXT NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards_post" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "tag" VARCHAR(254) NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "cards_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards_announcement" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,

    CONSTRAINT "cards_announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_data" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200),
    "size" INTEGER,
    "url" TEXT NOT NULL,
    "key" VARCHAR(200),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "image_id" TEXT NOT NULL,
    "user_id" TEXT,
    "announcement_id" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "views" (
    "id" TEXT NOT NULL,
    "post_id" TEXT,
    "announcement_id" TEXT,
    "total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "token" VARCHAR(200) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_image" (
    "key" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "is_cover" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "list_image_pkey" PRIMARY KEY ("post_id","image_id")
);

-- CreateTable
CREATE TABLE "list_tag" (
    "key" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "list_tag_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_blog_id_key" ON "users"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_blog_id_key" ON "posts"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "announcements_card_id_key" ON "announcements"("card_id");

-- CreateIndex
CREATE UNIQUE INDEX "cards_post_name_key" ON "cards_post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cards_post_post_id_key" ON "cards_post"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "cards_announcement_name_key" ON "cards_announcement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "image_data_url_key" ON "image_data"("url");

-- CreateIndex
CREATE UNIQUE INDEX "image_data_key_key" ON "image_data"("key");

-- CreateIndex
CREATE UNIQUE INDEX "images_image_id_key" ON "images"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_user_id_key" ON "images"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_announcement_id_key" ON "images"("announcement_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "views_post_id_key" ON "views"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "views_announcement_id_key" ON "views"("announcement_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_user_id_key" ON "token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "list_image_key_key" ON "list_image"("key");

-- CreateIndex
CREATE UNIQUE INDEX "list_tag_key_key" ON "list_tag"("key");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards_announcement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards_post" ADD CONSTRAINT "cards_post_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_image" ADD CONSTRAINT "list_image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_image" ADD CONSTRAINT "list_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("image_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_tag" ADD CONSTRAINT "list_tag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_tag" ADD CONSTRAINT "list_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

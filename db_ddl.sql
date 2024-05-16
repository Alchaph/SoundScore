-- sound.artists definition

CREATE TABLE `artists` (
                           `id` bigint(20) NOT NULL,
                           `description` varchar(255) DEFAULT NULL,
                           `image` varchar(255) DEFAULT NULL,
                           `name` varchar(255) DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sound.genres definition

CREATE TABLE `genres` (
                          `id` bigint(20) NOT NULL,
                          `description` varchar(255) DEFAULT NULL,
                          `name` varchar(255) DEFAULT NULL,
                          PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sound.songs definition

CREATE TABLE `songs` (
                         `id` bigint(20) NOT NULL,
                         `image` varchar(255) DEFAULT NULL,
                         `link` varchar(255) DEFAULT NULL,
                         `title` varchar(255) DEFAULT NULL,
                         `artist_id` bigint(20) DEFAULT NULL,
                         `genre_id` bigint(20) DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         KEY `FKdjq2ujqovw5rc14q60f8p6b6e` (`artist_id`),
                         KEY `FKd5mor9lg3wkqhn2tp0r75nkm` (`genre_id`),
                         CONSTRAINT `FKd5mor9lg3wkqhn2tp0r75nkm` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
                         CONSTRAINT `FKdjq2ujqovw5rc14q60f8p6b6e` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sound.users definition

CREATE TABLE `users` (
                         `id` bigint(20) NOT NULL,
                         `created` date DEFAULT NULL,
                         `email` varchar(255) DEFAULT NULL,
                         `is_account_non_expired` bit(1) NOT NULL,
                         `is_account_non_locked` bit(1) NOT NULL,
                         `is_credentials_non_expired` bit(1) NOT NULL,
                         `is_enabled` bit(1) NOT NULL,
                         `password` varchar(255) DEFAULT NULL,
                         `tel` varchar(255) DEFAULT NULL,
                         `username` varchar(255) DEFAULT NULL,
                         `artist_id` bigint(20) DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         KEY `FKf9cqvrxaqd44y85chjb9pffv8` (`artist_id`),
                         CONSTRAINT `FKf9cqvrxaqd44y85chjb9pffv8` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sound.posts definition

CREATE TABLE `posts` (
                         `id` bigint(20) NOT NULL,
                         `content` varchar(255) DEFAULT NULL,
                         `dislikes` bigint(20) DEFAULT NULL,
                         `image` varchar(255) DEFAULT NULL,
                         `likes` bigint(20) DEFAULT NULL,
                         `title` varchar(255) DEFAULT NULL,
                         `artist_id` bigint(20) DEFAULT NULL,
                         `genre_id` bigint(20) DEFAULT NULL,
                         `song_id` bigint(20) DEFAULT NULL,
                         `user_id` bigint(20) DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         KEY `FKtl5iiqqbv99rhpr2bhqy1v6cw` (`artist_id`),
                         KEY `FKpd8ekcoemln9s1cbxav2km13h` (`genre_id`),
                         KEY `FKfheekp1ddxo90erweblld3axm` (`song_id`),
                         KEY `FK5lidm6cqbc7u4xhqpxm898qme` (`user_id`),
                         CONSTRAINT `FK5lidm6cqbc7u4xhqpxm898qme` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
                         CONSTRAINT `FKfheekp1ddxo90erweblld3axm` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
                         CONSTRAINT `FKpd8ekcoemln9s1cbxav2km13h` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
                         CONSTRAINT `FKtl5iiqqbv99rhpr2bhqy1v6cw` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- sound.comments definition

CREATE TABLE `comments` (
                            `id` bigint(20) NOT NULL,
                            `message` varchar(255) DEFAULT NULL,
                            `title` varchar(255) DEFAULT NULL,
                            `post_id` bigint(20) DEFAULT NULL,
                            `user_id` bigint(20) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            KEY `FKh4c7lvsc298whoyd4w9ta25cr` (`post_id`),
                            KEY `FK8omq0tc18jd43bu5tjh6jvraq` (`user_id`),
                            CONSTRAINT `FK8omq0tc18jd43bu5tjh6jvraq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
                            CONSTRAINT `FKh4c7lvsc298whoyd4w9ta25cr` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
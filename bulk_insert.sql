INSERT INTO users (id, created_at, email, password, updated_at, username, artist_id)
VALUES
    (200, '2024-05-22 11:24:30.459000', 't@t', '$2a$10$tWXbD0JbNWKU79AYVi06/.MipMBIFIoIX0R3zig4871grWon1atAq', '2024-05-22 11:24:30.459000', 't', NULL);
-- Inserting data into the genres table
INSERT INTO genres (id, name, description)
VALUES
    (1, 'Rock', 'A genre of popular music that originated as "rock and roll" in the United States in the 1950s, and developed into a range of different styles in the 1960s and later.'),
    (2, 'Pop', 'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.'),
    (3, 'Hip Hop', 'A genre of popular music developed in the United States by inner-city African Americans and Latino Americans in the Bronx borough of New York City in the 1970s.'),
    (4, 'Country', 'A genre of popular music that originated in the Southern United States in the early 1920s.'),
    (5, 'R&B', 'Rhythm and blues, often abbreviated as R&B, is a genre of popular music that originated in African-American communities in the 1940s.'),
    (6, 'Jazz', 'A genre of music that originated in the African-American communities of New Orleans in the late 19th and early 20th centuries.'),
    (7, 'Electronic', 'A genre of music that relies on electronic instruments and technology for its production.'),
    (8, 'Classical', 'A genre of music that spans over multiple centuries and is characterized by its complexity and rich history.'),
    (9, 'Reggae', 'A genre of music that originated in Jamaica in the late 1960s.'),
    (10, 'Blues', 'A music genre that originated in the African-American communities of the Deep South of the United States.'),
    (11, 'Folk', 'A genre that includes traditional folk music and contemporary folk music.'),
    (12, 'Heavy Metal', 'A genre of rock music that developed in the late 1960s and early 1970s, largely in the United Kingdom and the United States.'),
    (13, 'Punk', 'A genre of rock music that emerged in the mid-1970s. It is characterized by fast tempos, short song lengths, and lyrics that often address political and social issues.'),
    (14, 'Indie', 'A genre of alternative rock music that originated in the United Kingdom and the United States in the 1980s.'),
    (15, 'Soul', 'A genre that combines elements of African-American gospel music, rhythm and blues, and jazz.');

-- Inserting data into the artists table
INSERT INTO artists (id, name, description, image)
VALUES
    (1, 'Michael Jackson', 'American singer, songwriter, and dancer. Dubbed the "King of Pop", he is regarded as one of the most significant cultural figures of the 20th century.', 'https://static.wikia.nocookie.net/bttf/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20220625105913'),
    (2, 'The Beatles', 'An English rock band formed in Liverpool in 1960. With a lineup comprising John Lennon, Paul McCartney, George Harrison, and Ringo Starr, they are regarded as the most influential band of all time.', 'https://cdn.britannica.com/18/136518-050-CD0E49C6/The-Beatles-Ringo-Starr-Paul-McCartney-George.jpg'),
    (3, 'Eminem', 'American rapper, songwriter, and record producer. He is one of the best-selling music artists of all time, with estimated worldwide sales of more than 220 million records.', 'https://nypost.com/wp-content/uploads/sites/2/2019/10/gettyimages-187596325.jpg?quality=75&strip=all&w=744'),
    (4, 'Johnny Cash', 'American singer, songwriter, musician, and actor. He is one of the best-selling music artists of all time.', 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Johnny_Cash_billboard_1969.jpg'),
    (5, 'Beyoncé', 'American singer, songwriter, actress, and record producer. She is regarded as one of the greatest artists of all time.', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Beyonce_-_Formation_World_Tour%2C_Sydney_%2829%29.jpg'),
    (6, 'Louis Armstrong', 'American trumpeter, composer, vocalist, and actor who was among the most influential figures in jazz.', 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Louis_Armstrong2.jpg'),
    (7, 'Daft Punk', 'French electronic music duo consisting of Thomas Bangalter and Guy-Manuel de Homem-Christo. They are considered one of the most successful electronic music groups of all time.', 'https://upload.wikimedia.org/wikipedia/en/a/ae/Daftpunklapremiere2010.jpg'),
    (8, 'Miles Davis', 'American jazz trumpeter, bandleader, and composer. He is among the most influential and acclaimed figures in the history of jazz and 20th-century music.', 'https://upload.wikimedia.org/wikipedia/commons/8/83/Miles_Davis_by_Palumbo.jpg'),
    (9, 'David Bowie', 'English singer, songwriter, and actor. He was a leading figure in the music industry and is regarded as one of the most influential musicians of the 20th century.', 'https://upload.wikimedia.org/wikipedia/commons/2/24/David_Bowie_1974.jpg'),
    (10, 'Bob Marley', 'Jamaican singer, songwriter, and musician. He is considered one of the pioneers of reggae music and one of the greatest musicians of all time.', 'https://upload.wikimedia.org/wikipedia/commons/5/56/Bob_Marley_Milan_1980.jpg'),
    (11, 'Elvis Presley', 'American singer and actor. Regarded as one of the most significant cultural icons of the 20th century, he is often referred to as the "King of Rock and Roll".', 'https://upload.wikimedia.org/wikipedia/commons/4/45/Elvis_Presley_promoting_Jailhouse_Rock.jpg'),
    (12, 'Kanye West', 'American rapper, singer, songwriter, record producer, and fashion designer. He is one of the most influential musicians of the 21st century.', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Kanye_West_-_Jesus_Is_King.png'),
    (13, 'Adele', 'English singer and songwriter. Known for her deep, expressive contralto vocals and emotive songwriting, she is one of the best-selling music artists of all time.', 'https://upload.wikimedia.org/wikipedia/commons/7/79/Adele_Live_2016.jpg'),
    (14, 'Led Zeppelin', 'An English rock band formed in London in 1968. The group consisted of guitarist Jimmy Page, singer Robert Plant, bassist and keyboardist John Paul Jones, and drummer John Bonham.', 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Led_Zeppelin_1977.jpg'),
    (15, 'Queen', 'British rock band formed in London in 1970. Their classic line-up was Freddie Mercury, Brian May, Roger Taylor, and John Deacon.', 'https://upload.wikimedia.org/wikipedia/en/1/1d/Queen_%28crest%29.png');

-- Inserting data into the songs table
INSERT INTO songs (id, title, image, link, genre_id, artist_id)
VALUES
    (1, 'Thriller', 'https://cdn.vox-cdn.com/thumbor/4x3I5wJGdZqHjQeb4TZlSU7Yc8g=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/13365433/mj.png', 'https://www.youtube.com/watch?v=sOnqjkJTMaA', 2, 1),
    (2, 'Hey Jude', 'https://faroutmagazine.co.uk/static/uploads/1/2019/10/WhatsApp-Image-2020-04-11-at-12.07.30.jpeg', 'https://www.youtube.com/watch?v=A_MjCqQoLLA', 1, 2),
    (3, 'Lose Yourself', 'https://upload.wikimedia.org/wikipedia/en/d/d6/Lose_Yourself.jpg', 'https://www.youtube.com/watch?v=_Yhyp-_hX2s', 3, 3),
    (4, 'Bohemian Rhapsody', 'https://ichef.bbci.co.uk/news/976/cpsprodpb/4B19/production/_86352291_bohemianrhapsody.jpg', 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ', 1, 15),
    (5, 'Imagine', 'https://upload.wikimedia.org/wikipedia/en/1/1d/John_Lennon_-_Imagine_John_Lennon.jpg', 'https://www.youtube.com/watch?v=VOgFZfRVaww', 2, 2),
    (6, 'Hotel California', 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg', 'https://www.youtube.com/watch?v=1GNiIKqoZf4', 1, 6),
    (7, 'Billie Jean', 'https://upload.wikimedia.org/wikipedia/en/c/c5/BillieJean.jpg', 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y', 2, 1),
    (8, 'Stairway to Heaven', 'https://upload.wikimedia.org/wikipedia/en/2/2a/Stairway_to_Heaven_by_Led_Zeppelin_single.png', 'https://www.youtube.com/watch?v=xbhCPt6PZIU', 1, 14),
    (9, 'Shape of You', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Ed_Sheeran_-_Shape_of_You_%28Official_Single_Cover%29.png/220px-Ed_Sheeran_-_Shape_of_You_%28Official_Single_Cover%29.png', 'https://www.youtube.com/watch?v=JGwWNGJdvx8', 2, NULL),
    (10, 'Smells Like Teen Spirit', 'https://upload.wikimedia.org/wikipedia/en/6/62/Nirvana_-_Nevermind_album_cover.jpg', 'https://www.youtube.com/watch?v=hTWKbfoikeg', 1, 8),
    (11, 'Yesterday', 'https://upload.wikimedia.org/wikipedia/en/a/a4/TheBeatles%28album%29cover.jpg', 'https://www.youtube.com/watch?v=huNlTk1lGEI', 2, 2),
    (12, 'Let It Be', 'https://upload.wikimedia.org/wikipedia/en/2/20/LetItBe.jpg', 'https://www.youtube.com/watch?v=ajCYQL8ouqw', 1, 2),
    (13, 'Sweet Child o Mine', 'https://upload.wikimedia.org/wikipedia/en/b/bf/Guns_N_Roses_-_Sweet_Child_o%27_Mine.png', 'https://www.youtube.com/watch?v=1w7OgIMMRc4', 12, 3),
    (14, 'Bohemian Like You', 'https://upload.wikimedia.org/wikipedia/en/5/5e/Bohemian_like_you_cover.jpg', 'https://www.youtube.com/watch?v=ElJ6dJ4i8vM', 14, 1);

-- Inserting data into the posts table
INSERT INTO posts (id, likes, dislikes, user_id, genre_id, artist_id, song_id)
VALUES
    (1, 10, 2, 200, NULL, NULL, 1),
    (2, 5, 1, 200, NULL, 2, NULL),
    (3, 8, 3, 200, NULL, NULL, 3),
    (4, 12, 4, 200, NULL, NULL, 5),
    (5, 6, 0, 200, 1, NULL, NULL),
    (6, 15, 2, 200, NULL, NULL, 6),
    (7, 8, 3, 200, NULL, 14, NULL),
    (8, 20, 1, 200, NULL, NULL, 7),
    (9, 10, 5, 200, NULL, 14, NULL),
    (10, 30, 3, 200, NULL, NULL, 10);

-- Inserting data into the comments table
INSERT INTO comments (id, title, message, post_id, user_id)
VALUES
    (1, 'Great song!', 'One of the best songs ever!', 1, 200),
    (2, 'Classic!', 'This song never gets old.', 2, 200),
    (3, 'Amazing performance', 'Eminem killed it in this one!', 3, 200),
    (4, 'Love this!', 'Such a catchy tune!', 4, 200),
    (5, 'Timeless', 'Still listening to this after all these years.', 5, 200),
    (6, 'Iconic', 'This song defines a generation.', 6, 200),
    (7, 'Forever a favorite', 'I could listen to this on repeat.', 7, 200),
    (8, 'Masterpiece', 'Pure genius.', 8, 200),
    (9, 'Memories', 'This song takes me back.', 9, 200),
    (10, 'Epic guitar solo', 'One of the best solos of all time.', 10, 200),
    (11, 'Soulful', 'This song speaks to the heart.', 10, 200);
INSERT INTO genres (name, description)
VALUES ('Rock',
        'A genre of popular music that originated as "rock and roll" in the United States in the 1950s, and developed into a range of different styles in the 1960s and later.'),
       ('Pop',
        'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.'),
       ('Hip Hop',
        'A genre of popular music developed in the United States by inner-city African Americans and Latino Americans in the Bronx borough of New York City in the 1970s.');

INSERT INTO artists (name, description, image)
VALUES ('Michael Jackson',
        'American singer, songwriter, and dancer. Dubbed the "King of Pop", he is regarded as one of the most significant cultural figures of the 20th century.',
        'https://static.wikia.nocookie.net/bttf/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20220625105913'),
       ('The Beatles',
        'An English rock band formed in Liverpool in 1960. With a lineup comprising John Lennon, Paul McCartney, George Harrison, and Ringo Starr, they are regarded as the most influential band of all time.',
        'https://cdn.britannica.com/18/136518-050-CD0E49C6/The-Beatles-Ringo-Starr-Paul-McCartney-George.jpg'),
       ('Eminem',
        'American rapper, songwriter, and record producer. He is one of the best-selling music artists of all time, with estimated worldwide sales of more than 220 million records.',
        'https://nypost.com/wp-content/uploads/sites/2/2019/10/gettyimages-187596325.jpg?quality=75&strip=all&w=744');

INSERT INTO users (username, password, email, tel, fk_artist)
VALUES ('user1', 'password1', 'user1@example.com', '+1234567890', 1),
       ('user2', 'password2', 'user2@example.com', NULL, NULL),
       ('user3', 'password3', 'user3@example.com', NULL, 3),
       ('user4', 'password4', 'user4@example.com', NULL, NULL),
       ('user5', 'password5', 'user5@example.com', NULL, 2);

INSERT INTO songs (title, image, link, fk_genre, fk_artist)
VALUES ('Thriller', 'https://cdn.vox-cdn.com/thumbor/4x3I5wJGdZqHjQeb4TZlSU7Yc8g=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/13365433/mj.png', 'https://www.youtube.com/watch?v=sOnqjkJTMaA', 2, 1),
       ('Hey Jude', 'https://faroutmagazine.co.uk/static/uploads/1/2019/10/WhatsApp-Image-2020-04-11-at-12.07.30.jpeg', 'https://www.youtube.com/watch?v=A_MjCqQoLLA', 1, 2),
       ('Lose Yourself', 'https://upload.wikimedia.org/wikipedia/en/d/d6/Lose_Yourself.jpg', 'https://www.youtube.com/watch?v=_Yhyp-_hX2s', 3, 3),
       ('Bohemian Rhapsody', 'https://ichef.bbci.co.uk/news/976/cpsprodpb/4B19/production/_86352291_bohemianrhapsody.jpg', 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ', 1, 2),
       ('Smells Like Teen Spirit', 'https://i.scdn.co/image/ab67616d0000b273e175a19e530c898d167d39bf', 'https://www.youtube.com/watch?v=hTWKbfoikeg', 1, 3);

INSERT INTO posts (likes, dislikes, fk_user, fk_genre, fk_artist, fk_song)
VALUES (10, 2, 1, NULL, NULL, 1),
       (5, 1, 2, NULL, 2, NULL),
       (8, 3, 3, 1, NULL, 4),
       (12, 4, 4, 2, NULL, NULL),
       (6, 0, 5, 1, 3, 5);

INSERT INTO comments (title, message, fk_post, fk_user)
VALUES ('Great song!', 'One of the best songs ever!', 1, 2),
       ('Classic!', 'This song never gets old.', 2, 1),
       ('Amazing performance', 'Eminem killed it in this one!', 3, 5),
       ('Queen rocks!', 'Freddie Mercury is a legend!', 4, 3),
       ('Nirvana forever!', 'Their music speaks to my soul.', 5, 4);

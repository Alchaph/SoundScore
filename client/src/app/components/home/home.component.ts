import {Component, OnInit} from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton, MatFabButton} from "@angular/material/button";
import {PostService} from "../../services/PostService/post.service";
import {Post} from "../../models/Post";
import {
  MatCard, MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem} from "@angular/material/list";
import {MatTab, MatTabGroup} from "@angular/material/tabs";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatButtonToggle,
    MatIcon,
    RouterLink,
    MatFabButton,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardAvatar,
    MatCardHeader,
    MatCardImage,
    NgOptimizedImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatDivider,
    MatLine,
    MatList,
    MatListItem,
    MatTab,
    MatTabGroup
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  posts: Post[] = [
    {
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 1',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },
    {
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 1',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },
    {
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 1',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },
    // Post 2
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
  ];

  visiblePostsArtist: Post[] = [
    {
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 132',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },
    // Post 2
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },{
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 1',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },{
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 1',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },
  ]; // First = Left, Last = Right
  invisiblePostsArtist: Post[] = [
    {
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 1',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },
    // Post 2
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 1',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },
    // Post 2
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 1,
      likes: 10,
      dislikes: 2,
      title: 'Mock Post 1',
      content: 'This is the content for Mock Post 1',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 1,
        username: 'testUser1',
        email: 'test1@example.com',
        password: 'testPassword1',
        created_at: new Date('2022-01-01'),
        updated_at: new Date('2022-01-01'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 1,
        name: 'Genre 1',
        description: 'This is Genre 1'
      },
      artist: {
        id: 1,
        name: 'testArtist1',
        description: 'This is test artist 1',
        image: 'https://example.com/artist1.jpg'
      },
      song: {
        id: 1,
        title: 'Song 1',
        image: 'https://example.com/song1.jpg',
        link: 'https://example.com/song1.mp3',
        genre: {
          id: 1,
          name: 'Genre 1',
          description: 'This is Genre 1'
        },
        artist: {
          id: 1,
          name: 'testArtist1',
          description: 'This is test artist 1',
          image: 'https://example.com/artist1.jpg'
        }
      }
    },
    // Post 2
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
    {
      id: 2,
      likes: 20,
      dislikes: 4,
      title: 'Mock Post 2',
      content: 'This is the content for Mock Post 2',
      image: 'https://th.bing.com/th/id/OIP.CzLbCJ3jBeiNRJ1hPyeG2gHaHP?w=174&h=180&c=7&r=0&o=5&pid=1.7',
      user: {
        id: 2,
        username: 'testUser2',
        email: 'test2@example.com',
        password: 'testPassword2',
        created_at: new Date('2022-02-02'),
        updated_at: new Date('2022-02-02'),
        enabled: true,
        authorities: [],
        accountNonLocked: true,
        credentialsNonExpired: true,
        accountNonExpired: true,
      },
      genre: {
        id: 2,
        name: 'Genre 2',
        description: 'This is Genre 2'
      },
      artist: {
        id: 2,
        name: 'testArtist2',
        description: 'This is test artist 2',
        image: 'https://example.com/artist2.jpg'
      },
      song: {
        id: 2,
        title: 'Song 2',
        image: 'https://example.com/song2.jpg',
        link: 'https://example.com/song2.mp3',
        genre: {
          id: 2,
          name: 'Genre 2',
          description: 'This is Genre 2'
        },
        artist: {
          id: 2,
          name: 'testArtist2',
          description: 'This is test artist 2',
          image: 'https://example.com/artist2.jpg'

        }
      }
    },
  ];

  visiblePostsGenre: Post[] = [];
  invisiblePostsGenre: Post[] = [];

  visiblePostsSong: Post[] = [];
  invisiblePostsSong: Post[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      console.log(data)
      this.posts = data;
      for (let i = 0; i < data.length; i++) {
        if (i < 5) {
          console.log(i)
          this.visiblePostsArtist.push(data[i]);
        } else {
          this.invisiblePostsArtist.push(data[i]);
        }
      }
    });
  }

  leftSlideArtist() {
    console.log("Right Slide")
    const post = this.invisiblePostsArtist[0];
    this.invisiblePostsArtist.shift();
    this.visiblePostsArtist.unshift(post);
    const postOut = this.visiblePostsArtist.pop();
    if (postOut) {
      this.invisiblePostsArtist.push(postOut);
    }
  }

  rightSlideArtist() {
    console.log("Left Slide")
    const post = this.invisiblePostsArtist[this.invisiblePostsArtist.length - 1];
    this.invisiblePostsArtist.pop();
    this.visiblePostsArtist.push(post);
    const postOut = this.visiblePostsArtist.shift();
    if (postOut) {
      this.invisiblePostsArtist.unshift(postOut);
    }
  }

    leftSlideGenre() {
      console.log("Right Slide")
      const post = this.invisiblePostsGenre[0];
      this.invisiblePostsGenre.shift();
      this.visiblePostsGenre.unshift(post);
      const postOut = this.visiblePostsGenre.pop();
      if (postOut) {
        this.invisiblePostsGenre.push(postOut);
      }
    }

    rightSlideGenre() {
      console.log("Left Slide")
      const post = this.invisiblePostsGenre[this.invisiblePostsGenre.length - 1];
      this.invisiblePostsGenre.pop();
      this.visiblePostsGenre.push(post);
      const postOut = this.visiblePostsGenre.shift();
      if (postOut) {
        this.invisiblePostsGenre.unshift(postOut);
      }
    }

      leftSlideSong() {
        console.log("Right Slide")
        const post = this.invisiblePostsSong[0];
        this.invisiblePostsSong.shift();
        this.visiblePostsSong.unshift(post);
        const postOut = this.visiblePostsSong.pop();
        if (postOut) {
          this.invisiblePostsSong.push(postOut);
        }
      }

      rightSlideSong() {
        console.log("Left Slide")
        const post = this.invisiblePostsSong[this.invisiblePostsSong.length - 1];
        this.invisiblePostsSong.pop();
        this.visiblePostsSong.push(post);
        const postOut = this.visiblePostsSong.shift();
        if (postOut) {
          this.invisiblePostsSong.unshift(postOut);
        }
  }


}

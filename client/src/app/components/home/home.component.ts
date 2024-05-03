import { Component } from '@angular/core';
import {HeadNavBarComponent} from "../head-nav-bar/head-nav-bar.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatFabButton} from "@angular/material/button";
import {Post} from "../../models/Post";
import {PostOut} from "../../models/PostOut";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeadNavBarComponent,
    MatButtonToggle,
    MatIcon,
    RouterLink,
    MatFabButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  posts: PostOut[] = [
    {
      id: 1,
      likes: 0,
      dislikes: 0,
      title: "title1",
      content: "content1",
      image: "image1",
      user: {
        id: 1,
        username: "user1",
        password: "password1",
        email: "email1",
        tel: "tel1",
        created: "created1",
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
        },
      genre: {
        id: 1,
        name: "genre1",
        description: "description1"
      },
      artist: {
        id: 1,
        name: "artist1",
        description: "description1",
        image: "image1"
      },
      song: {
        id: 1,
        title: "song1",
        image: "image1",
        link: "audio1",
        genre: {
          id: 1,
          name: "genre1",
          description: "description1"
        },
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      }
    },
    {
      id: 1,
      likes: 0,
      dislikes: 0,
      title: "title1",
      content: "content1",
      image: "image1",
      user: {
        id: 1,
        username: "user1",
        password: "password1",
        email: "email1",
        tel: "tel1",
        created: "created1",
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      },
      genre: {
        id: 1,
        name: "genre1",
        description: "description1"
      },
      artist: {
        id: 1,
        name: "artist1",
        description: "description1",
        image: "image1"
      },
      song: {
        id: 1,
        title: "song1",
        image: "image1",
        link: "audio1",
        genre: {
          id: 1,
          name: "genre1",
          description: "description1"
        },
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      }
    },
    {
      id: 1,
      likes: 0,
      dislikes: 0,
      title: "title1",
      content: "content1",
      image: "image1",
      user: {
        id: 1,
        username: "user1",
        password: "password1",
        email: "email1",
        tel: "tel1",
        created: "created1",
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      },
      genre: {
        id: 1,
        name: "genre1",
        description: "description1"
      },
      artist: {
        id: 1,
        name: "artist1",
        description: "description1",
        image: "image1"
      },
      song: {
        id: 1,
        title: "song1",
        image: "image1",
        link: "audio1",
        genre: {
          id: 1,
          name: "genre1",
          description: "description1"
        },
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      }
    },
    {
      id: 1,
      likes: 0,
      dislikes: 0,
      title: "title1",
      content: "content1",
      image: "image1",
      user: {
        id: 1,
        username: "user1",
        password: "password1",
        email: "email1",
        tel: "tel1",
        created: "created1",
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      },
      genre: {
        id: 1,
        name: "genre1",
        description: "description1"
      },
      artist: {
        id: 1,
        name: "artist1",
        description: "description1",
        image: "image1"
      },
      song: {
        id: 1,
        title: "song1",
        image: "image1",
        link: "audio1",
        genre: {
          id: 1,
          name: "genre1",
          description: "description1"
        },
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      }
    },
    {
      id: 1,
      likes: 0,
      dislikes: 0,
      title: "title1",
      content: "content1",
      image: "image1",
      user: {
        id: 1,
        username: "user1",
        password: "password1",
        email: "email1",
        tel: "tel1",
        created: "created1",
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      },
      genre: {
        id: 1,
        name: "genre1",
        description: "description1"
      },
      artist: {
        id: 1,
        name: "artist1",
        description: "description1",
        image: "image1"
      },
      song: {
        id: 1,
        title: "song1",
        image: "image1",
        link: "audio1",
        genre: {
          id: 1,
          name: "genre1",
          description: "description1"
        },
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      }
    },
    {
      id: 1,
      likes: 0,
      dislikes: 0,
      title: "title1",
      content: "content1",
      image: "image1",
      user: {
        id: 1,
        username: "user1",
        password: "password1",
        email: "email1",
        tel: "tel1",
        created: "created1",
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      },
      genre: {
        id: 1,
        name: "genre1",
        description: "description1"
      },
      artist: {
        id: 1,
        name: "artist1",
        description: "description1",
        image: "image1"
      },
      song: {
        id: 1,
        title: "song1",
        image: "image1",
        link: "audio1",
        genre: {
          id: 1,
          name: "genre1",
          description: "description1"
        },
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      }
    },
    {
      id: 1,
      likes: 0,
      dislikes: 0,
      title: "title1",
      content: "content1",
      image: "image1",
      user: {
        id: 1,
        username: "user1",
        password: "password1",
        email: "email1",
        tel: "tel1",
        created: "created1",
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      },
      genre: {
        id: 1,
        name: "genre1",
        description: "description1"
      },
      artist: {
        id: 1,
        name: "artist1",
        description: "description1",
        image: "image1"
      },
      song: {
        id: 1,
        title: "song1",
        image: "image1",
        link: "audio1",
        genre: {
          id: 1,
          name: "genre1",
          description: "description1"
        },
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      }
    },
    {
      id: 1,
      likes: 0,
      dislikes: 0,
      title: "title1",
      content: "content1",
      image: "image1",
      user: {
        id: 1,
        username: "user1",
        password: "password1",
        email: "email1",
        tel: "tel1",
        created: "created1",
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      },
      genre: {
        id: 1,
        name: "genre1",
        description: "description1"
      },
      artist: {
        id: 1,
        name: "artist1",
        description: "description1",
        image: "image1"
      },
      song: {
        id: 1,
        title: "song1",
        image: "image1",
        link: "audio1",
        genre: {
          id: 1,
          name: "genre1",
          description: "description1"
        },
        artist: {
          id: 1,
          name: "artist1",
          description: "description1",
          image: "image1"
        }
      }
    },

  ];


}

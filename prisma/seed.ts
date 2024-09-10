const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

type UserDto = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

type CommentDto = {
  content: string;
  createdAt: string;
  score: Number;
  user: UserDto;
  replies?: CommentDto[];
};

const prisma = new PrismaClient();

const imageToBlob = (imagePath: string): Buffer => {
  let _imagePath = imagePath.replace("./", __dirname + "/");
  return fs.readFileSync(path.resolve(_imagePath));
};

// Helper function to recursively create comments and their replies
async function createComment(data: any, parentId = null, rootCommentId = null) {
  const comment = await prisma.comment.create({
    data: {
      content: data.content,
      createdAt: data.createdAt,
      score: data.score,
      userId: data.user.id,
      parentId: parentId,
      rootCommentId: rootCommentId,
    },
  });

  for (const reply of data.replies || []) {
    await createComment(reply, comment.id, rootCommentId || comment.id);
  }
}

async function seedDatabase() {
  try {
    // Users data
    const users = [
      {
        username: "amyrobson",
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
      },
      {
        username: "maxblagun",
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
      },
      {
        username: "ramsesmiron",
        image: {
          png: "./images/avatars/image-ramsesmiron.png",
          webp: "./images/avatars/image-ramsesmiron.webp",
        },
      },
      {
        username: "juliusomo",
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
      },
    ];

    // Create users and store their ids
    const userMap: Record<string, any> = {};
    for (const user of users) {
      const createdUser = await prisma.user.create({
        data: {
          username: user.username,
          image: {
            create: {
              png: imageToBlob(user.image.png),
              webp: imageToBlob(user.image.webp),
            },
          },
        },
      });
      userMap[user.username] = createdUser;
    }

    // Comments data with user objects
    const comments = [
      {
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: new Date("2024-08-04"),
        score: 12,
        user: userMap["amyrobson"],
        replies: [],
      },
      {
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: new Date("2024-08-20"),
        score: 5,
        user: userMap["maxblagun"],
        replies: [
          {
            content:
              "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: new Date("2024-08-27"),
            score: 4,
            user: userMap["ramsesmiron"],
            replies: [
              {
                content:
                  "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                createdAt: new Date("2024-09-02"),
                score: 2,
                user: userMap["juliusomo"],
              },
            ],
          },
        ],
      },
    ];

    // Seed the comments and replies
    for (const comment of comments) {
      await createComment(comment);
    }

    console.log("Database has been seeded with comments and replies.");

    await prisma.$disconnect();
  } catch (error) {
    console.error("Error while creating users:", error);
  }
}

seedDatabase();

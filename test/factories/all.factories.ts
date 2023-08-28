
import { faker } from "@faker-js/faker";
import { PrismaService } from "../../src/prisma/prisma.service";
import { Media } from "@prisma/client";

export class AllFactories {

    async createMedia(prisma: PrismaService) {
        return await prisma.media.create({
          data: {
            title: faker.person.fullName(),
            username: faker.internet.url(),
          },
        });   
}

async createPost(prisma: PrismaService, image = false) {
    return await prisma.post.create({
      data: {
        title: faker.person.fullName(),
        text: faker.lorem.paragraph(),
        image: image ? faker.internet.url() : null,
      },
    });
  }
  }
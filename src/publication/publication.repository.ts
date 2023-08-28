import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from '../publication/dto/create-publication.dto';
import { UpdatePublicationDto } from '../publication/dto/update-publication.dto';

@Injectable()
export class PublicationRepository {
  constructor(private prisma: PrismaService) {}

  async create(createPublicationDto: CreatePublicationDto) {
    return await this.prisma.publication.create({
      data: createPublicationDto,
    });
  }

  async findAll(published: boolean | null, after: string | null) {
    const currentDate = new Date();

    return await this.prisma.publication.findMany({
      where: {
        date: {
          lt: published ? currentDate : undefined,
        },
        AND: {
          date: {
            gte: after ? new Date(after) : undefined,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.publication.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return await this.prisma.publication.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  async delete(id: number) {
    return await this.prisma.publication.delete({ where: { id } });
  }

  async publicationCountByMediaId(mediaId: number) {
    return await this.prisma.publication.count({
      where: { mediaId },
    });
  }

  async publicationCountByPostId(postId: number) {
    return await this.prisma.publication.count({
      where: { postId },
    });
  }
}
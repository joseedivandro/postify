import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import * as dayjs from 'dayjs';
import { PublicationRepository } from './publication.repository';
import { MediaRepository } from '../medias/media.repository';
import { PostRepository } from '../post/post.repository';
import { ErrorHelper } from '../error/error.message';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly mediaRepository: MediaRepository,
    private readonly postRepository: PostRepository,
    private readonly ErrorHelper: ErrorHelper,
  ) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const { mediaId, postId, date } = createPublicationDto;

    const [media, post] = await Promise.all([
      this.mediaRepository.findOne(mediaId),
      this.postRepository.findOne(postId),
    ]);

    if (!post || !media) {
      const message = this.ErrorHelper.errorMessageBuild(post, media);

      throw new NotFoundException(message);
    }

    return await this.publicationRepository.create({ mediaId, postId, date });
  }

  async findAll(published: boolean | null, after: string | null) {
    return await this.publicationRepository.findAll(published, after);
  }

  async findOne(id: number) {
    const publication = await this.publicationRepository.findOne(id);

    if (!publication) throw new NotFoundException('Publication not found!');

    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const { mediaId, postId, date } = updatePublicationDto;

    const publication = await this.publicationRepository.findOne(id);

    if (!publication)
      throw new NotFoundException(
        'Publication not found, no updates were applied!',
      );

    const [media, post] = await Promise.all([
      this.mediaRepository.findOne(mediaId),
      this.postRepository.findOne(postId),
    ]);

    if (!post || !media) {
      const message = this.ErrorHelper.errorMessageBuild(post, media);

      throw new NotFoundException(message);
    }

    const currentDate = new Date(Date.now());
    const isPassed = dayjs(currentDate).isAfter(publication.date);

    if (isPassed)
      throw new ForbiddenException("Publish date has passed, can't update!");

    return await this.publicationRepository.update(id, {
      mediaId,
      postId,
      date,
    });
  }

  async remove(id: number) {
    const existsPublication = await this.publicationRepository.findOne(id);

    if (!existsPublication) {
      throw new NotFoundException(
        'Publication not found, no deletion applied!',
      );
    }

    return await this.publicationRepository.delete(id);
  }

  
}
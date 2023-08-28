import { Module, forwardRef } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PostModule } from '../post/post.module';
import { MediaModule } from '../medias/medias.module';
import { PublicationRepository } from './publication.repository';
import { PostRepository } from '../post/post.repository';
import { MediaRepository } from '../medias/media.repository';
import { ErrorHelper } from '../error/error.message';

@Module({
  imports: [forwardRef(() => PostModule), forwardRef(() => MediaModule)],
  controllers: [PublicationController],
  providers: [
    PublicationRepository,
    PublicationService,
    PostRepository,
    MediaRepository,
    ErrorHelper,
  ],
  exports: [PublicationService],
})
export class PublicationModule {}
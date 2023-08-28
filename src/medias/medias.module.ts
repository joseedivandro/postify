import { Module, forwardRef } from '@nestjs/common';
import { MediaService } from './medias.service';
import { MediaController } from './medias.controller';
import { PublicationModule } from '../publication/publication.module';
import { MediaRepository } from './media.repository';
import { PublicationRepository } from '../publication/publication.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [forwardRef(() => PublicationModule)],
  controllers: [MediaController],
  providers: [
    MediaService,
    MediaRepository,
    PublicationRepository,
    PrismaService,
  ],
  exports: [MediaService],
})
export class MediaModule {}
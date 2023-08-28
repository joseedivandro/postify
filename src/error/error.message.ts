import { Injectable } from '@nestjs/common';
import { Media, Post } from '@prisma/client';

@Injectable()
export class ErrorHelper {
  errorMessageBuild(post: Post, media: Media) {
    let message = '';

    if (!post) {
      message += 'Post ';
    }

    if (!media) {
      if (message.length > 0) {
        message += 'and ';
      }
      message += 'Media ';
    }

    message += 'not exists!';

    return message;
  }
}
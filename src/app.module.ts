import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { ShortLinkController } from './short-link/short-link.controller'
import { ShortLinkService } from './short-link/short-link.service'

@Module({
  imports: [],
  controllers: [AppController, ShortLinkController],
  providers: [AppService, PrismaService, ShortLinkService]
})
export class AppModule {}

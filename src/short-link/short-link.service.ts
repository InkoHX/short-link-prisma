import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ShortLinkService {
  public constructor (
    private readonly prismaService: PrismaService
  ) {}

  public async create (source: string) {
    const result = await this.prismaService.url.create({
      data: {
        source
      }
    })

    return {
      ...result,
      shortId: result.id.toString(36)
    }
  }

  public async delete (id: string) {
    const urlId = parseInt(id, 36)
    if (isNaN(urlId)) throw new Error('Not a valid ID')
    const result = await this.prismaService.url.delete({
      where: {
        id: urlId
      }
    })

    return {
      ...result,
      shortId: id
    }
  }

  public fetchSource (shortId: string) {
    return this.prismaService.url.findFirst({
      where: {
        id: parseInt(shortId, 36)
      }
    })
  }
}

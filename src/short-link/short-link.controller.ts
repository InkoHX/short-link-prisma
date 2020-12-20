import { Body, Controller, Delete, HttpCode, NotFoundException, Param, Post } from '@nestjs/common'

import { ShortLinkService } from './short-link.service'

@Controller('short-link')
export class ShortLinkController {
  public constructor(private readonly shortLink: ShortLinkService) { }

  @Post()
  @HttpCode(201)
  public async create(@Body('source') source: string) {
    const result = await this.shortLink.create(source)

    return result
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    try {
      const result = await this.shortLink.delete(id)

      return result
    } catch {
      throw new NotFoundException()
    }
  }
}

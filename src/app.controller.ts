import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common'
import { Response } from 'express'

import { ShortLinkService } from './short-link/short-link.service'

@Controller()
export class AppController {
  constructor(
    private readonly shortLink: ShortLinkService
  ) {}

  @Get(':id')
  public async redirect (@Param('id') id: string, @Res() res: Response) {
    const source = (await this.shortLink.fetchSource(id))?.source

    if (!source) throw new NotFoundException()

    res.redirect(source)
  }
}

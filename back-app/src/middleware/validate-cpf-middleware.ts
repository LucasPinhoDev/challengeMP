import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateCpfMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { cpf } = req.body;

    if (!cpf || cpf.length !== 11) {
      throw new BadRequestException('CPF inválido');
    }

    next();
  }
}

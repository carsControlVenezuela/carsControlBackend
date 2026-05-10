import { ILogger } from '../../../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../../../core/infrastructure/logger/winston.logger';
import { IStateRepository } from '../../domain/repositories/iState.repository';
import { findStateOrFail } from '../helpers/findStateOrFail.helper';
import { IUpdateStateDisablePort } from '../ports/iUpdateStateDisable.port';

export class UpdateStateDisableUseCase implements IUpdateStateDisablePort {
  private readonly logger: ILogger = AppLogger;

  constructor(private stateRepository: IStateRepository) {}

  async execute(id: string): Promise<void> {
    this.logger.info(`Actualizando el estado deshabilitado del estado con id ${id}`, {
      context: 'UpdateStateDisableUseCase',
    });

    const state = await findStateOrFail(this.stateRepository, id);

    state.deactivate();

    await this.stateRepository.update(state);

    this.logger.info(`Se ha eliminado estado con id ${id} ha sido actualizado`, {
      context: 'UpdateStateDisableUseCase',
    });
  }
}

import { configure, transports, format } from 'winston';
import { env } from '../env';
import { BootstrapLoader } from '../lib/bootstrap/BootstrapLoader';

export class LoggerLoader extends BootstrapLoader {
  onStartup(): void {
    configure({
      transports: [
        new transports.Console({
          level: env.log.level,
          handleExceptions: true,
          format: env.node !== 'development'
            ? format.combine(
              format.json()
            )
            : format.combine(
              format.colorize(),
              format.simple()
            ),
        }),
      ],
    });
  }
}
import { ConsoleLogger, Injectable, Logger, OnModuleInit } from "@nestjs/common";

@Injectable()
export class AppService implements OnModuleInit {
  private logger: Logger = new Logger('topContext');
  private loggerWithoutTopContext: Logger = new Logger();
  private consoleLogger = new ConsoleLogger('topContext');
  private consoleLoggerWithoutTopContext = new ConsoleLogger();

  onModuleInit(): any {
    this.logger.log('message'); // works as intended
    this.logger.log('message', 'context'); // context doesn't override logger context but is printed as an additional message instead
    this.logger.error('message', 'stack'); // works as intended
    this.logger.error('message', 'stack', 'context'); // context doesn't override logger context and stack is not printed as a stack trace but rather as an additional message

    this.loggerWithoutTopContext.log('message'); // works as intended
    this.loggerWithoutTopContext.log('message', 'context'); // works as intended
    this.loggerWithoutTopContext.error('message', 'stack'); // stack is misinterpreted as context
    this.loggerWithoutTopContext.error('message', 'stack', 'context'); // works as intended

    this.consoleLogger.log('message'); // works as intended
    this.consoleLogger.log('message', 'context'); // works as intended
    this.consoleLogger.error('message', 'stack'); // stack is misinterpreted as context
    this.consoleLogger.error('message', 'stack', 'context'); // works as intended

    this.consoleLoggerWithoutTopContext.log('message'); // works as intended
    this.consoleLoggerWithoutTopContext.log('message', 'context'); // works as intended
    this.consoleLoggerWithoutTopContext.error('message', 'stack'); // stack is misinterpreted as context
    this.consoleLoggerWithoutTopContext.error('message', 'stack', 'context'); // works as intended
  }

  getHello(): string {
    return 'Hello World!';
  }
}

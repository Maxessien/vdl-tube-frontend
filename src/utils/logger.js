class Logger {
  constructor(isDevelopment = true) {
    this.isDevelopment = isDevelopment;
  }

  format(level, message, data) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      data,
    };
  }

  log(message, data = null) {
    const formatted = this.format('LOG', message, data);
    if (this.isDevelopment) console.log(formatted);
  }

  error(message, error = null) {
    const formatted = this.format('ERROR', message, error);
    console.error(formatted);
    
    // Send to error tracking (Sentry, LogRocket, etc.)
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(new Error(message), { extra: error });
    }
  }

  warn(message, data = null) {
    const formatted = this.format('WARN', message, data);
    console.warn(formatted);
  }

  info(message, data = null) {
    const formatted = this.format('INFO', message, data);
    if (this.isDevelopment) console.info(formatted);
  }
}

const logger = new Logger(process.env.NODE_ENV === 'development')

export default logger;
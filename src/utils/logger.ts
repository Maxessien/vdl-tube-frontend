class Logger {
  isDevelopment: boolean;
  constructor(isDevelopment = true) {
    this.isDevelopment = isDevelopment;
  }

  getCallerInfo() {
    if (!this.isDevelopment) return null;

    const stack = new Error().stack;
    const stackLines = stack?.split("\n");
    // Skip: Error, getCallerInfo, format, and the log/error/warn/info method
    // The actual caller is at index 4
    const callerLine = stackLines?.[4];

    if (!callerLine) return null;

    // Extract file path and line number from stack trace
    const match =
      callerLine.match(/\((.+):(\d+):(\d+)\)/) ||
      callerLine.match(/at (.+):(\d+):(\d+)/);

    if (match) {
      const [, filePath, line, column] = match;
      return {
        file: filePath,
        line: parseInt(line),
        column: parseInt(column),
      };
    }

    return null;
  }

  format(level: any, message: string, data: any) {
    const timestamp = new Date().toISOString();
    const formatted = {
      timestamp,
      level,
      message,
      data,
    };

    // Add caller info only in development
    if (this.isDevelopment) {
      const caller = this.getCallerInfo();
      if (caller) {
        formatted.level = caller;
      }
    }

    return formatted;
  }

  log(message: string, data: any = null) {
    const formatted = this.format("LOG", message, data);
    if (this.isDevelopment) console.log(formatted);
  }

  error(message: string, error: any) {
    const formatted = this.format("ERROR", message, error);
    console.error(formatted);
  }

  warn(message: string, data: any = null) {
    const formatted = this.format("WARN", message, data);
    console.warn(formatted);
  }

  info(message: string, data: any = null) {
    const formatted = this.format("INFO", message, data);
    if (this.isDevelopment) console.info(formatted);
  }
}

export default new Logger(process.env.NODE_ENV === "development");

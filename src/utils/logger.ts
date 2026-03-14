interface LoggerPayload {
  timestamp: string;
  level: "LOG" | "ERROR" | "WARN" | "INFO";
  message: string;
  data: unknown;
}

declare global {
  interface Window {
    Sentry?: {
      captureException: (error: Error, context?: { extra?: unknown }) => void;
    };
  }
}

class Logger {
  private isDevelopment: boolean;

  constructor(isDevelopment = true) {
    this.isDevelopment = isDevelopment;
  }

  private format(level: LoggerPayload["level"], message: string, data: unknown): LoggerPayload {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      data,
    };
  }

  log(message: string, data: unknown = null) {
    const formatted = this.format("LOG", message, data);
    if (this.isDevelopment) {
      console.log(formatted);
    }
  }

  error(message: string, error: unknown = null) {
    const formatted = this.format("ERROR", message, error);
    console.error(formatted);

    if (typeof window !== "undefined" && window.Sentry) {
      window.Sentry.captureException(new Error(message), { extra: error });
    }
  }

  warn(message: string, data: unknown = null) {
    const formatted = this.format("WARN", message, data);
    console.warn(formatted);
  }

  info(message: string, data: unknown = null) {
    const formatted = this.format("INFO", message, data);
    if (this.isDevelopment) {
      console.info(formatted);
    }
  }
}

const logger = new Logger(process.env.NODE_ENV === "development");

export default logger;
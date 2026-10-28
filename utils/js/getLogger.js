/** enum for setting/controlling which log messages to log. default: WARN */
const VERBOSITY = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
}

const createLogger = (loggerName, verbosity) => {
    return {
        info: (...args) => {
            if (verbosity <= VERBOSITY.INFO) {
                console.log(loggerName, ...args)
            }
        },
        log: (...args) => {
            if (verbosity <= VERBOSITY.INFO) {
                console.log(loggerName, ...args)
            }
        },
        warn: (...args) => {
            if (verbosity <= VERBOSITY.WARN) {
                console.warn(loggerName, ...args)
            }
        },
        error: (...args) => {
            if (verbosity <= VERBOSITY.ERROR) {
                console.error(loggerName, ...args)
            }
        },
        debug: (...args) => {
            if (verbosity <= VERBOSITY.DEBUG) {
                console.debug(loggerName, ...args)
            }
        },
    }
}

/** internal dict where all the loggers live */
const loggers = {
    default: createLogger('default'),
}

const getLogger = (loggerName, verbosity = VERBOSITY.WARN) => {
    if (loggers[loggerName] === undefined) {
        const logger = createLogger(loggerName, verbosity)
        loggers[loggerName] = logger
    }

    return loggers[loggerName]
}

module.exports = {
    VERBOSITY,
    getLogger,
}

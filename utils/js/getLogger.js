const loggers = {}

const VERBOSITY = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
}

const _initNewLogger = (loggerName, verbosity) => {
    const logger = {
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
    loggers[loggerName] = logger
}

const getLogger = (loggerName, verbosity = VERBOSITY.WARN) => {
    if (!loggers[loggerName]) {
        _initNewLogger(loggerName, verbosity)
    }

    return loggers[loggerName]
}

module.exports = {
    VERBOSITY,
    getLogger,
}

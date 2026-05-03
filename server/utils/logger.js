// utils/logger.js

const logger = (req, res, next) => {
  try {
    const method = req.method;
    const url = req.originalUrl;
    const time = new Date().toISOString();

    console.log(`[${time}] ${method} ${url}`);

    next(); // 🔥 MUST CALL NEXT
  } catch (err) {
    next(err); // pass error to global handler
  }
};

module.exports = logger;
import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

web.listen(5000, () => {
  logger.info("server listening on http://localhost:5000");
});

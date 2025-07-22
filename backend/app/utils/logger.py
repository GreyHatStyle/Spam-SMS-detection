import logging
import os
from logging.handlers import RotatingFileHandler

LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOG_DIR, 'app.log')
MAX_BYTES_FILE_SIZE = 5 * 1024 * 1024 # 5 MB

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
    handlers=[
        RotatingFileHandler(LOG_FILE, maxBytes=MAX_BYTES_FILE_SIZE, backupCount=5),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('app')

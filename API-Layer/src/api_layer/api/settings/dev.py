from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
ENV_DIR = str(Path(BASE_DIR / 'env/.env.dev').resolve())

load_dotenv(ENV_DIR)

from api.base import *
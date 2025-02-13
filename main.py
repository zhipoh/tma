# Configure logging
import logging
import os
import sys

from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CallbackContext, CommandHandler, ContextTypes

# from dotenv import load_dotenv

logging.basicConfig(
    stream=sys.stdout,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Constants
MINI_APP_URL = "https://zhipoh.github.io/tma/"
WELCOME_IMAGE_PATH = "images/shop.jpg"

# Load environment variables
# load_dotenv()
TOKEN = "7536093977:AAHJcwNH5qC_GdTfBku3MaW28Jg2Fa7Ulh0"

# Message texts
WELCOME_MESSAGE = (
    "Features:\n"
    "- Basic command handling\n"
    "- Inline keyboard integration\n"
    "- Mini App Integration\n\n"
    "Click the button below to open my Mini App!"
)

async def start(update: Update, context: CallbackContext):
    logger.info(f"User {update.effective_user.id} started the bot")
    keyboard = [
        [InlineKeyboardButton(
            "Enter",
            web_app={"url": MINI_APP_URL}
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    try:
        with open(WELCOME_IMAGE_PATH, 'rb') as photo:
            await update.message.reply_photo(
                photo=photo,
                caption=WELCOME_MESSAGE,
                reply_markup=reply_markup
            )
    except FileNotFoundError:
        logger.error(f"Image file not found at {WELCOME_IMAGE_PATH}")
        await update.message.reply_text(
            WELCOME_MESSAGE,
            reply_markup=reply_markup
        )


def signal_handler(signum, frame):
    logger.info('Signal received, shutting down...')
    exit(0)

def main():
    # Initialize bot
    application = ApplicationBuilder().token(TOKEN).build()

    # Add command handlers
    application.add_handler(CommandHandler("start", start))


    # # Add error handler
    # application.add_error_handler(error_handler)

    # # Setup signal handler
    # signal.signal(signal.SIGINT, signal_handler)

    # Start the bot
    logger.info("Starting bot...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
class Config(object):
    DEBUG = True


class DevConfig(Config):
    DEBUG = True
    SECRET_KEY = 'this-is-dev-key-only'

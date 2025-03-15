//! Regex
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/;
const LAST_NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^.{8,30}$/;

module.exports = {
  NAME_REGEX,
  LAST_NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
};

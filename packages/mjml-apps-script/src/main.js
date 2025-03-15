
/**
 * ### Description
 * Convert MJML to HTML for use in email.
 * 
 * @param {string} str MJML string
 * @param {object} [options] Options object
 * @returns {object} result object.
 */
function mjml2html(str, options) {
    return globalThis.mjml2html_(str, options);
}
